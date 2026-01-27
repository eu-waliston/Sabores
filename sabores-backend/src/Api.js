const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Database connection
const { connectDB, Database } = require("./config/database");

// Import routes
const routes = require("./routes");

// Initialize Express app
const app = express();

// ======================
// SECURITY MIDDLEWARES
// ======================

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // limit per IP
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
    retryAfter: 15 * 60, // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ["page", "limit", "sort", "fields", "search"],
}));

// ======================
// PERFORMANCE MIDDLEWARES
// ======================

// Compress responses
app.use(compression());

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // Create a write stream for logging (in production)
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "logs", "access.log"),
    { flags: "a" }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
}

// ======================
// BODY PARSING
// ======================

// Parse JSON bodies
app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({
  extended: true,
  limit: "10mb",
  parameterLimit: 100,
}));

// Parse cookies
app.use(cookieParser());

// ======================
// STATIC FILES
// ======================

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Favicon
app.use("/favicon.ico", express.static(path.join(__dirname, "public", "favicon.ico")));

// ======================
// DATABASE CONNECTION
// ======================

// Initialize database connection
const db = new Database();

// ======================
// ROUTES
// ======================

// API Documentation route
app.get("/api/docs", (req, res) => {
  res.json({
    message: "API Documentation",
    version: "1.0.0",
    endpoints: {
      users: {
        register: "POST /api/v1/users/register",
        login: "POST /api/v1/users/login",
        profile: "GET /api/v1/users/profile",
        getAll: "GET /api/v1/users",
      },
      recipes: {
        getAll: "GET /api/v1/recipes",
        getOne: "GET /api/v1/recipes/:id",
        create: "POST /api/v1/recipes",
        update: "PUT /api/v1/recipes/:id",
        delete: "DELETE /api/v1/recipes/:id",
      },
    },
    status: "operational",
    documentation: "https://github.com/your-repo/docs",
  });
});

// API Status endpoint
app.get("/api/status", (req, res) => {
  const dbStatus = Database.getConnectionState();
  
  res.status(200).json({
    success: true,
    message: "API Status",
    data: {
      api: "operational",
      database: dbStatus,
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
  });
});

// Main API routes
app.use("/api", routes);

// ======================
// ERROR HANDLING
// ======================

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    suggestions: [
      "Check the API documentation at /api/docs",
      "Verify the endpoint URL",
      "Ensure you're using the correct HTTP method",
    ],
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🚨 Global Error Handler:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user?.id,
  });

  // Default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const isProduction = process.env.NODE_ENV === "production";

  // Response object
  const errorResponse = {
    success: false,
    message: isProduction && statusCode === 500 ? "Something went wrong" : message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  // Add stack trace in development
  if (!isProduction && err.stack) {
    errorResponse.stack = err.stack;
  }

  // Add validation errors if present
  if (err.errors) {
    errorResponse.errors = err.errors;
  }

  // Special handling for common errors
  if (err.name === "ValidationError") {
    errorResponse.message = "Validation failed";
    errorResponse.errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json(errorResponse);
  }

  if (err.name === "CastError") {
    errorResponse.message = "Invalid ID format";
    return res.status(400).json(errorResponse);
  }

  if (err.name === "JsonWebTokenError") {
    errorResponse.message = "Invalid token";
    return res.status(401).json(errorResponse);
  }

  if (err.name === "TokenExpiredError") {
    errorResponse.message = "Token expired";
    return res.status(401).json(errorResponse);
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    errorResponse.message = `${field} already exists`;
    return res.status(400).json(errorResponse);
  }

  res.status(statusCode).json(errorResponse);
});

// ======================
// GRACEFUL SHUTDOWN
// ======================

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  // Perform cleanup if needed
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  // Perform cleanup if needed
});

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n🚨 ${signal} received. Starting graceful shutdown...`);
  
  try {
    // Close database connection
    await Database.disconnect();
    console.log("✅ Database connection closed");
    
    // Close server
    server.close(() => {
      console.log("✅ HTTP server closed");
      console.log("👋 Process terminated gracefully");
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error("⏰ Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
    
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

// Listen for shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// ======================
// SERVER STARTUP
// ======================

// Get port from environment or use default
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`
🚀 Recipe API Server Started!
─────────────────────────────
📍 Environment: ${process.env.NODE_ENV || "development"}
🌐 Server URL: http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}
📚 API Documentation: http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}/api/docs
📊 API Status: http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}/api/status
🗄️  Database: ${Database.getConnectionState()}
⏰ Started at: ${new Date().toLocaleString()}
─────────────────────────────
  `);
});

// Export app for testing
module.exports = { app, server };
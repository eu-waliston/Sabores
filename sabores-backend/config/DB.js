const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      // Configurações modernas do Mongoose
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        socketTimeoutMS: 45000,
        family: 4, // Usar IPv4
      };

      // Conexão com retry
      await mongoose.connect(process.env.DB_CONNECTION, options);

      // Configurações globais do Mongoose
      mongoose.set("strictQuery", true); // Recomendado para novas versões
      mongoose.set("debug", process.env.NODE_ENV === "development"); // Debug apenas em desenvolvimento

      this._setupEventListeners();
      
      console.log("✅ MongoDB connected successfully!");
      console.log(`📊 Database: ${mongoose.connection.name}`);
      console.log(`👤 Host: ${mongoose.connection.host}`);
      
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      // Implementar lógica de retry ou graceful shutdown
      process.exit(1);
    }
  }

  _setupEventListeners() {
    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("🔴 MongoDB error:", error);
      // Aqui você pode adicionar alertas (Slack, Email, etc.)
    });

    db.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    db.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });

    db.on("connecting", () => {
      console.log("🔄 Connecting to MongoDB...");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("👋 MongoDB connection closed through app termination");
      process.exit(0);
    });
  }

  // Métodos úteis
  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("👋 MongoDB disconnected");
    } catch (error) {
      console.error("Error disconnecting MongoDB:", error);
    }
  }

  static getConnectionState() {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };
    return states[mongoose.connection.readyState];
  }
}

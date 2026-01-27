const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = {
  // Middleware de autenticação
  authenticate: async (req, res, next) => {
    try {
      // 1. Obter token do header
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided."
        });
      }

      // 2. Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Buscar usuário (excluindo senha)
      const user = await User.findById(decoded.id).select("-password");
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found."
        });
      }

      // 4. Verificar se a conta está ativa
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: "Account is deactivated."
        });
      }

      // 5. Adicionar usuário à requisição
      req.user = user;
      req.token = token;
      
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token."
        });
      }
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired."
        });
      }
      
      console.error("Auth middleware error:", error);
      res.status(500).json({
        success: false,
        message: "Authentication failed."
      });
    }
  },

  // Middleware de autorização por role
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(" or ")}`
        });
      }
      next();
    };
  },

  // Verificar se é o próprio usuário ou admin
  isOwnerOrAdmin: (req, res, next) => {
    const isOwner = req.params.id === req.user.id;
    const isAdmin = req.user.role === "admin";
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only modify your own account."
      });
    }
    next();
  },

  // Rate limiting (opcional)
  rateLimit: require("express-rate-limit")({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite por IP
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later."
    }
  })
};

module.exports = authMiddleware;
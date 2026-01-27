const { body, param, query, validationResult } = require("express-validator");

const userValidators = {
  // Registro
  register: [
    body("username")
      .notEmpty().withMessage("Username is required")
      .isLength({ min: 3, max: 30 }).withMessage("Username must be 3-30 characters")
      .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers and underscores"),
    
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please enter a valid email")
      .normalizeEmail(),
    
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
      .matches(/\d/).withMessage("Password must contain at least one number"),
    
    body("confirmPassword")
      .notEmpty().withMessage("Please confirm your password")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match")
  ],

  // Login
  login: [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please enter a valid email"),
    
    body("password")
      .notEmpty().withMessage("Password is required")
  ],

  // Atualizar perfil
  updateProfile: [
    body("profile.firstName")
      .optional()
      .isLength({ max: 50 }).withMessage("First name too long"),
    
    body("profile.lastName")
      .optional()
      .isLength({ max: 50 }).withMessage("Last name too long"),
    
    body("profile.bio")
      .optional()
      .isLength({ max: 500 }).withMessage("Bio cannot exceed 500 characters"),
    
    body("profile.avatar")
      .optional()
      .isURL().withMessage("Avatar must be a valid URL"),
    
    body("social")
      .optional()
      .isObject().withMessage("Social must be an object")
  ],

  // Mudar senha
  changePassword: [
    body("currentPassword")
      .notEmpty().withMessage("Current password is required"),
    
    body("newPassword")
      .notEmpty().withMessage("New password is required")
      .isLength({ min: 6 }).withMessage("New password must be at least 6 characters")
      .matches(/\d/).withMessage("New password must contain at least one number")
      .custom((value, { req }) => value !== req.body.currentPassword)
      .withMessage("New password must be different from current password"),
    
    body("confirmPassword")
      .notEmpty().withMessage("Please confirm your new password")
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage("Passwords do not match")
  ],

  // Esqueci a senha
  forgotPassword: [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please enter a valid email")
  ],

  // Resetar senha
  resetPassword: [
    param("token")
      .notEmpty().withMessage("Reset token is required"),
    
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],

  // Verificar email
  verifyEmail: [
    param("token")
      .notEmpty().withMessage("Verification token is required")
  ],

  // Refresh token
  refreshToken: [
    body("refreshToken")
      .notEmpty().withMessage("Refresh token is required")
  ],

  // ID param
  idParam: [
    param("id")
      .notEmpty().withMessage("User ID is required")
      .isMongoId().withMessage("Invalid user ID")
  ],

  // Recipe ID param
  recipeId: [
    param("recipeId")
      .notEmpty().withMessage("Recipe ID is required")
      .isMongoId().withMessage("Invalid recipe ID")
  ],

  // Mudar role
  changeRole: [
    param("id")
      .isMongoId().withMessage("Invalid user ID"),
    
    body("role")
      .notEmpty().withMessage("Role is required")
      .isIn(["user", "admin", "moderator"]).withMessage("Invalid role")
  ],

  // Mudar status
  changeStatus: [
    param("id")
      .isMongoId().withMessage("Invalid user ID"),
    
    body("isActive")
      .notEmpty().withMessage("Status is required")
      .isBoolean().withMessage("Status must be a boolean")
  ],

  // Atualizar usuário (admin)
  updateUser: [
    param("id")
      .isMongoId().withMessage("Invalid user ID"),
    
    body("email")
      .optional()
      .isEmail().withMessage("Please enter a valid email"),
    
    body("username")
      .optional()
      .isLength({ min: 3, max: 30 }).withMessage("Username must be 3-30 characters")
  ]
};

// Middleware de validação
const validate = (validations) => {
  return async (req, res, next) => {
    // Executar todas as validações
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Verificar erros
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }
    
    // Formatar erros
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
      value: err.value
    }));
    
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: extractedErrors
    });
  };
};

module.exports = { userValidators, validate };
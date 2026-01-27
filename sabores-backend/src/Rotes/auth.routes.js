const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authValidators, validate } = require("../middleware/auth.validator");

// Login
router.post("/login",
  validate(authValidators.login),
  authController.login
);

// Registrar
router.post("/register",
  validate(authValidators.register),
  authController.register
);

// Refresh token
router.post("/refresh",
  validate(authValidators.refreshToken),
  authController.refreshToken
);

// Verificar token
router.post("/verify",
  authController.verifyToken
);

// Logout
router.post("/logout",
  authController.logout
);

// Google OAuth
router.get("/google",
  authController.googleAuth
);

router.get("/google/callback",
  authController.googleCallback
);

// Facebook OAuth
router.get("/facebook",
  authController.facebookAuth
);

router.get("/facebook/callback",
  authController.facebookCallback
);

// GitHub OAuth
router.get("/github",
  authController.githubAuth
);

router.get("/github/callback",
  authController.githubCallback
);

// Versionamento
const apiRouter = express.Router();
apiRouter.use("/v1/auth", router);

module.exports = apiRouter;
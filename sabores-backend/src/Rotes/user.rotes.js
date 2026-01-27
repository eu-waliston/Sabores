const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { userValidators, validate } = require("../middleware/user.validator");
const upload = require("../middleware/upload.middleware");

// ======================
// ROTAS PÚBLICAS
// ======================

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "User API",
    timestamp: new Date().toISOString()
  });
});

// Registrar usuário
router.post("/register",
  validate(userValidators.register),
  userController.register
);

// Login
router.post("/login",
  validate(userValidators.login),
  userController.login
);

// Refresh token
router.post("/refresh-token",
  validate(userValidators.refreshToken),
  userController.refreshToken
);

// Esqueci a senha
router.post("/forgot-password",
  validate(userValidators.forgotPassword),
  userController.forgotPassword
);

// Resetar senha
router.post("/reset-password/:token",
  validate(userValidators.resetPassword),
  userController.resetPassword
);

// Verificar email
router.post("/verify-email/:token",
  validate(userValidators.verifyEmail),
  userController.verifyEmail
);

// Perfil público de usuário
router.get("/profile/:username",
  validate(userValidators.usernameParam),
  userController.getPublicProfile
);

// Listar usuários públicos (com paginação)
router.get("/public",
  userController.getPublicUsers
);

// ======================
// ROTAS PROTEGIDAS (Autenticadas)
// ======================

// Middleware de autenticação
router.use(authMiddleware.authenticate);

// Meu perfil
router.get("/profile",
  userController.getMyProfile
);

// Atualizar meu perfil
router.put("/profile",
  upload.single("avatar"),
  validate(userValidators.updateProfile),
  userController.updateMyProfile
);

// Mudar minha senha
router.put("/profile/password",
  validate(userValidators.changePassword),
  userController.changePassword
);

// Meus favoritos
router.get("/profile/favorites",
  userController.getMyFavorites
);

// Adicionar aos favoritos
router.post("/profile/favorites/:recipeId",
  validate(userValidators.recipeId),
  userController.addToFavorites
);

// Remover dos favoritos
router.delete("/profile/favorites/:recipeId",
  validate(userValidators.recipeId),
  userController.removeFromFavorites
);

// Minhas receitas
router.get("/profile/recipes",
  userController.getMyRecipes
);

// Minhas estatísticas
router.get("/profile/stats",
  userController.getMyStats
);

// Minhas notificações
router.get("/profile/notifications",
  userController.getMyNotifications
);

// Marcar notificações como lidas
router.put("/profile/notifications/read",
  userController.markNotificationsAsRead
);

// Logout
router.post("/logout",
  userController.logout
);

// Deletar minha conta
router.delete("/profile",
  userController.deleteMyAccount
);

// ======================
// ROTAS ADMIN
// ======================

router.use(authMiddleware.authorize("admin"));

// Listar todos usuários (admin)
router.get("/",
  userController.getAllUsers
);

// Buscar usuário por ID (admin)
router.get("/:id",
  validate(userValidators.idParam),
  userController.getUserById
);

// Atualizar usuário (admin)
router.put("/:id",
  validate(userValidators.updateUser),
  userController.updateUser
);

// Deletar usuário (admin)
router.delete("/:id",
  validate(userValidators.idParam),
  userController.deleteUser
);

// Mudar role do usuário (admin)
router.put("/:id/role",
  validate(userValidators.changeRole),
  userController.changeUserRole
);

// Mudar status do usuário (admin)
router.put("/:id/status",
  validate(userValidators.changeStatus),
  userController.changeUserStatus
);

// Estatísticas de usuários (admin)
router.get("/admin/stats",
  userController.getUserStats
);

// Exportar usuários (admin)
router.get("/admin/export/:format",
  userController.exportUsers
);

// Versionamento da API
const apiRouter = express.Router();
apiRouter.use("/v1/users", router);

module.exports = apiRouter;
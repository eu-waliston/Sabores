const User = require("../models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/email.service");

class UserController {
  // Serviço de resposta padronizado
  _sendResponse(res, success, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  // ======================
  // AUTENTICAÇÃO
  // ======================

  /**
   * Registro de novo usuário
   */
  async register(req, res) {
    try {
      const { username, email, password, confirmPassword, profile } = req.body;

      // Verificar se email já existe
      const existingEmail = await User.isEmailTaken(email);
      if (existingEmail) {
        return this._sendResponse(res, false, "Email already registered", null, 400);
      }

      // Verificar se username já existe
      const existingUsername = await User.isUsernameTaken(username);
      if (existingUsername) {
        return this._sendResponse(res, false, "Username already taken", null, 400);
      }

      // Criar usuário
      const user = await User.create({
        username,
        email,
        password,
        profile
      });

      // Gerar token de verificação de email
      const verifyToken = crypto.randomBytes(32).toString("hex");
      user.verifyEmailToken = crypto
        .createHash("sha256")
        .update(verifyToken)
        .digest("hex");
      user.verifyEmailExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
      await user.save();

      // Enviar email de verificação (opcional)
      const verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${verifyToken}`;
      
      try {
        await sendEmail({
          to: user.email,
          subject: "Verify Your Email",
          html: `
            <h1>Welcome to Recipe App!</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verifyUrl}">Verify Email</a>
            <p>This link expires in 24 hours.</p>
          `
        });
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
        // Não falhar o registro se o email falhar
      }

      // Gerar token JWT
      const token = user.generateAuthToken();

      // Remover campos sensíveis da resposta
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.resetPasswordToken;
      delete userResponse.resetPasswordExpire;
      delete userResponse.verifyEmailToken;
      delete userResponse.verifyEmailExpire;

      this._sendResponse(
        res,
        true,
        "User registered successfully. Please check your email to verify your account.",
        {
          user: userResponse,
          token,
          expiresIn: process.env.JWT_EXPIRE || "30d"
        },
        201
      );

    } catch (error) {
      console.error("Registration error:", error);
      this._sendResponse(res, false, "Registration failed", null, 500);
    }
  }

  /**
   * Login de usuário
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário com senha
      const user = await User.findByEmail(email);
      
      if (!user) {
        return this._sendResponse(res, false, "Invalid credentials", null, 401);
      }

      // Verificar senha
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return this._sendResponse(res, false, "Invalid credentials", null, 401);
      }

      // Verificar se a conta está ativa
      if (!user.isActive) {
        return this._sendResponse(res, false, "Account is deactivated", null, 403);
      }

      // Atualizar último login
      user.lastLogin = new Date();
      await user.save();

      // Gerar tokens
      const accessToken = user.generateAuthToken();
      const refreshToken = crypto.randomBytes(40).toString("hex");

      // Salvar refresh token no banco (em produção, use Redis)
      user.refreshToken = refreshToken;
      await user.save();

      // Remover campos sensíveis
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshToken;

      // Configurar cookie (opcional)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
      });

      this._sendResponse(res, true, "Login successful", {
        user: userResponse,
        token: accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRE || "30d"
      });

    } catch (error) {
      console.error("Login error:", error);
      this._sendResponse(res, false, "Login failed", null, 500);
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const tokenFromCookie = req.cookies?.refreshToken;
      const token = refreshToken || tokenFromCookie;

      if (!token) {
        return this._sendResponse(res, false, "Refresh token required", null, 400);
      }

      const user = await User.findOne({ refreshToken: token });
      
      if (!user) {
        return this._sendResponse(res, false, "Invalid refresh token", null, 401);
      }

      // Gerar novo access token
      const accessToken = user.generateAuthToken();

      this._sendResponse(res, true, "Token refreshed", {
        token: accessToken,
        expiresIn: process.env.JWT_EXPIRE || "30d"
      });

    } catch (error) {
      console.error("Refresh token error:", error);
      this._sendResponse(res, false, "Token refresh failed", null, 500);
    }
  }

  /**
   * Logout
   */
  async logout(req, res) {
    try {
      // Remover refresh token do usuário
      req.user.refreshToken = undefined;
      await req.user.save();

      // Limpar cookie
      res.clearCookie("refreshToken");

      this._sendResponse(res, true, "Logout successful");

    } catch (error) {
      console.error("Logout error:", error);
      this._sendResponse(res, false, "Logout failed", null, 500);
    }
  }

  // ======================
  // GERENCIAMENTO DE CONTA
  // ======================

  /**
   * Obter perfil do usuário atual
   */
  async getMyProfile(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .select("-password -refreshToken")
        .populate("favorites", "name imageURL rate")
        .populate("myRecipes", "name imageURL rate");

      this._sendResponse(res, true, "Profile retrieved", { user });

    } catch (error) {
      console.error("Get profile error:", error);
      this._sendResponse(res, false, "Failed to retrieve profile", null, 500);
    }
  }

  /**
   * Atualizar perfil do usuário atual
   */
  async updateMyProfile(req, res) {
    try {
      const updates = req.body;
      const allowedUpdates = ["profile", "social"];
      const filteredUpdates = {};

      // Filtrar apenas campos permitidos
      Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
          filteredUpdates[key] = updates[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        req.user.id,
        filteredUpdates,
        { 
          new: true,
          runValidators: true 
        }
      ).select("-password -refreshToken");

      this._sendResponse(res, true, "Profile updated successfully", { user });

    } catch (error) {
      console.error("Update profile error:", error);
      this._sendResponse(res, false, "Failed to update profile", null, 500);
    }
  }

  /**
   * Alterar senha
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user;

      // Verificar senha atual
      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return this._sendResponse(res, false, "Current password is incorrect", null, 400);
      }

      // Atualizar senha
      user.password = newPassword;
      await user.save();

      // Enviar email de notificação
      try {
        await sendEmail({
          to: user.email,
          subject: "Password Changed",
          html: `
            <h1>Password Changed Successfully</h1>
            <p>Your password was changed on ${new Date().toLocaleString()}</p>
            <p>If you didn't make this change, please contact support immediately.</p>
          `
        });
      } catch (emailError) {
        console.error("Failed to send password change email:", emailError);
      }

      this._sendResponse(res, true, "Password changed successfully");

    } catch (error) {
      console.error("Change password error:", error);
      this._sendResponse(res, false, "Failed to change password", null, 500);
    }
  }

  /**
   * Esqueci a senha
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        // Por segurança, não revelar que o email não existe
        return this._sendResponse(res, true, "If an account exists with this email, a reset link has been sent");
      }

      // Gerar reset token
      const resetToken = user.generateResetPasswordToken();
      await user.save();

      // Criar URL de reset
      const resetUrl = `${process.env.FRONTEND_URL || req.protocol}://${req.get("host")}/reset-password/${resetToken}`;

      // Enviar email
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: `
          <h1>Password Reset</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link expires in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });

      this._sendResponse(res, true, "Password reset email sent");

    } catch (error) {
      console.error("Forgot password error:", error);
      this._sendResponse(res, false, "Failed to process request", null, 500);
    }
  }

  /**
   * Resetar senha
   */
  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Hash do token para comparar
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      // Buscar usuário com token válido
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
      });

      if (!user) {
        return this._sendResponse(res, false, "Invalid or expired token", null, 400);
      }

      // Atualizar senha
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      // Enviar confirmação
      await sendEmail({
        to: user.email,
        subject: "Password Reset Successful",
        html: `
          <h1>Password Reset Successful</h1>
          <p>Your password has been successfully reset.</p>
          <p>If you didn't make this change, please contact support immediately.</p>
        `
      });

      this._sendResponse(res, true, "Password reset successful");

    } catch (error) {
      console.error("Reset password error:", error);
      this._sendResponse(res, false, "Failed to reset password", null, 500);
    }
  }

  /**
   * Verificar email
   */
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await User.findOne({
        verifyEmailToken: hashedToken,
        verifyEmailExpire: { $gt: Date.now() }
      });

      if (!user) {
        return this._sendResponse(res, false, "Invalid or expired verification token", null, 400);
      }

      user.isVerified = true;
      user.verifyEmailToken = undefined;
      user.verifyEmailExpire = undefined;
      await user.save();

      this._sendResponse(res, true, "Email verified successfully");

    } catch (error) {
      console.error("Verify email error:", error);
      this._sendResponse(res, false, "Failed to verify email", null, 500);
    }
  }

  // ======================
  // FAVORITOS
  // ======================

  async getMyFavorites(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .populate({
          path: "favorites",
          select: "name imageURL rate description categories",
          options: { sort: { createdAt: -1 } }
        });

      this._sendResponse(res, true, "Favorites retrieved", {
        favorites: user.favorites
      });

    } catch (error) {
      console.error("Get favorites error:", error);
      this._sendResponse(res, false, "Failed to retrieve favorites", null, 500);
    }
  }

  async addToFavorites(req, res) {
    try {
      const { recipeId } = req.params;
      await req.user.addFavorite(recipeId);

      this._sendResponse(res, true, "Added to favorites");

    } catch (error) {
      console.error("Add favorite error:", error);
      this._sendResponse(res, false, "Failed to add to favorites", null, 500);
    }
  }

  async removeFromFavorites(req, res) {
    try {
      const { recipeId } = req.params;
      await req.user.removeFavorite(recipeId);

      this._sendResponse(res, true, "Removed from favorites");

    } catch (error) {
      console.error("Remove favorite error:", error);
      this._sendResponse(res, false, "Failed to remove from favorites", null, 500);
    }
  }

  // ======================
  // ADMIN FUNCTIONS
  // ======================

  /**
   * Listar todos os usuários (admin)
   */
  async getAllUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const filter = {};
      
      // Filtros opcionais
      if (req.query.role) filter.role = req.query.role;
      if (req.query.isVerified) filter.isVerified = req.query.isVerified === 'true';
      if (req.query.isActive) filter.isActive = req.query.isActive === 'true';
      if (req.query.search) {
        filter.$or = [
          { username: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ];
      }

      const [users, total] = await Promise.all([
        User.find(filter)
          .select("-password -refreshToken")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        User.countDocuments(filter)
      ]);

      this._sendResponse(res, true, "Users retrieved", {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      });

    } catch (error) {
      console.error("Get all users error:", error);
      this._sendResponse(res, false, "Failed to retrieve users", null, 500);
    }
  }

  /**
   * Buscar usuário por ID (admin)
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id)
        .select("-password -refreshToken")
        .populate("favorites", "name imageURL")
        .populate("myRecipes", "name imageURL");

      if (!user) {
        return this._sendResponse(res, false, "User not found", null, 404);
      }

      this._sendResponse(res, true, "User retrieved", { user });

    } catch (error) {
      console.error("Get user by ID error:", error);
      this._sendResponse(res, false, "Failed to retrieve user", null, 500);
    }
  }

  /**
   * Atualizar usuário (admin)
   */
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).select("-password -refreshToken");

      if (!user) {
        return this._sendResponse(res, false, "User not found", null, 404);
      }

      this._sendResponse(res, true, "User updated successfully", { user });

    } catch (error) {
      console.error("Update user error:", error);
      this._sendResponse(res, false, "Failed to update user", null, 500);
    }
  }

  /**
   * Deletar usuário (admin)
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return this._sendResponse(res, false, "User not found", null, 404);
      }

      this._sendResponse(res, true, "User deleted successfully");

    } catch (error) {
      console.error("Delete user error:", error);
      this._sendResponse(res, false, "Failed to delete user", null, 500);
    }
  }

  /**
   * Mudar role do usuário (admin)
   */
  async changeUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        return this._sendResponse(res, false, "User not found", null, 404);
      }

      this._sendResponse(res, true, "User role updated", { user });

    } catch (error) {
      console.error("Change role error:", error);
      this._sendResponse(res, false, "Failed to change role", null, 500);
    }
  }

  /**
   * Deletar minha própria conta
   */
  async deleteMyAccount(req, res) {
    try {
      await User.findByIdAndDelete(req.user.id);
      
      // Limpar cookie
      res.clearCookie("refreshToken");

      this._sendResponse(res, true, "Account deleted successfully");

    } catch (error) {
      console.error("Delete account error:", error);
      this._sendResponse(res, false, "Failed to delete account", null, 500);
    }
  }

  /**
   * Obter minhas receitas
   */
  async getMyRecipes(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .populate({
          path: "myRecipes",
          select: "name imageURL rate description createdAt",
          options: { sort: { createdAt: -1 } }
        });

      this._sendResponse(res, true, "Recipes retrieved", {
        recipes: user.myRecipes
      });

    } catch (error) {
      console.error("Get my recipes error:", error);
      this._sendResponse(res, false, "Failed to retrieve recipes", null, 500);
    }
  }
}

// Exportar como instância única
module.exports = new UserController();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    // Identificação básica
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      lowercase: true,
      index: true,
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ],
      validate: {
        validator: async function(email) {
          if (!this.isModified('email')) return true;
          const user = await this.constructor.findOne({ email });
          return !user;
        },
        message: 'Email already in use'
      }
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Não retorna em queries por padrão
      validate: {
        validator: function(v) {
          // Pelo menos uma letra maiúscula, uma minúscula, um número
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(v);
        },
        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      }
    },

    // Informações do perfil
    profile: {
      firstName: {
        type: String,
        trim: true,
        maxlength: [50, "First name cannot exceed 50 characters"]
      },
      lastName: {
        type: String,
        trim: true,
        maxlength: [50, "Last name cannot exceed 50 characters"]
      },
      bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
        trim: true
      },
      avatar: {
        type: String,
        default: "https://ui-avatars.com/api/?name=User&background=random",
        validate: {
          validator: function(v) {
            if (!v) return true;
            return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))|(data:image\/[^;]+;base64[^"]+)$/i.test(v);
          },
          message: "Avatar must be a valid image URL or base64 string"
        }
      },
      location: {
        type: String,
        trim: true
      },
      website: {
        type: String,
        trim: true,
        validate: {
          validator: function(v) {
            if (!v) return true;
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
          },
          message: "Please enter a valid website URL"
        }
      },
      dateNasc: {
        type: Date,
        required: [true, "Birth date is required"],
        validate: {
          validator: function(v) {
            const today = new Date();
            const birthDate = new Date(v);
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 13; // Mínimo 13 anos
          },
          message: "You must be at least 13 years old"
        }
      }
    },

    // Sistema de roles/permissões
    role: {
      type: String,
      enum: {
        values: ["user", "premium", "moderator", "admin"],
        message: "Role must be either user, premium, moderator, or admin"
      },
      default: "user",
      index: true
    },

    // Receitas do usuário
    myRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      index: true
    }],

    // Receitas favoritas
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      index: true
    }],

    // Conexões sociais
    social: {
      facebook: {
        type: String,
        trim: true
      },
      twitter: {
        type: String,
        trim: true
      },
      instagram: {
        type: String,
        trim: true
      },
      github: {
        type: String,
        trim: true
      }
    },

    // Status da conta
    isVerified: {
      type: Boolean,
      default: false,
      index: true
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    isOnline: {
      type: Boolean,
      default: false
    },

    // Estatísticas
    stats: {
      recipeCount: {
        type: Number,
        default: 0
      },
      favoriteCount: {
        type: Number,
        default: 0
      },
      followerCount: {
        type: Number,
        default: 0
      },
      followingCount: {
        type: Number,
        default: 0
      },
      totalViews: {
        type: Number,
        default: 0
      },
      totalLikes: {
        type: Number,
        default: 0
      }
    },

    // Segurança e tokens
    lastLogin: {
      type: Date
    },

    lastPasswordChange: {
      type: Date,
      default: Date.now
    },

    loginAttempts: {
      type: Number,
      default: 0,
      select: false
    },

    lockUntil: {
      type: Date,
      select: false
    },

    refreshToken: {
      type: String,
      select: false
    },

    resetPasswordToken: {
      type: String,
      select: false
    },

    resetPasswordExpire: {
      type: Date,
      select: false
    },

    verifyEmailToken: {
      type: String,
      select: false
    },

    verifyEmailExpire: {
      type: Date,
      select: false
    },

    twoFactorSecret: {
      type: String,
      select: false
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
      select: false
    },

    // Preferências do usuário
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      pushNotifications: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "auto"
      },
      language: {
        type: String,
        default: "en"
      },
      privacy: {
        profile: {
          type: String,
          enum: ["public", "private", "friends"],
          default: "public"
        },
        recipes: {
          type: String,
          enum: ["public", "private", "friends"],
          default: "public"
        }
      }
    }
  },
  {
    timestamps: true, // Cria createdAt e updatedAt automaticamente
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        // Remover campos sensíveis ao serializar para JSON
        delete ret.password;
        delete ret.refreshToken;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpire;
        delete ret.verifyEmailToken;
        delete ret.verifyEmailExpire;
        delete ret.twoFactorSecret;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        return ret;
      }
    },
    toObject: {
      virtuals: true
    }
  }
);

// ======================
// VIRTUAIS
// ======================

// Nome completo
UserSchema.virtual("fullName").get(function() {
  if (this.profile?.firstName && this.profile?.lastName) {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }
  return this.username;
});

// Idade
UserSchema.virtual("age").get(function() {
  if (!this.profile?.dateNasc) return null;
  const today = new Date();
  const birthDate = new Date(this.profile.dateNasc);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// URL do perfil
UserSchema.virtual("profileUrl").get(function() {
  return `/users/${this.username}`;
});

// ======================
// MIDDLEWARE (HOOKS)
// ======================

// Hash da senha antes de salvar
UserSchema.pre("save", async function(next) {
  // Só hash se a senha foi modificada
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Atualizar data da última mudança de senha
    this.lastPasswordChange = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// Atualizar timestamps
UserSchema.pre("save", function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Limpar referências quando usuário for deletado
UserSchema.pre("remove", async function(next) {
  try {
    // Remover referências nas receitas (se houver)
    const Recipe = mongoose.model("Recipe");
    await Recipe.updateMany(
      { createdBy: this._id },
      { $set: { createdBy: null } }
    );
    
    // Remover comentários (se houver)
    await Recipe.updateMany(
      { "comments.user": this._id },
      { $pull: { comments: { user: this._id } } }
    );
    
    next();
  } catch (error) {
    next(error);
  }
});

// ======================
// MÉTODOS DE INSTÂNCIA
// ======================

UserSchema.methods = {
  // Comparar senha
  comparePassword: async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  },

  // Gerar JWT token
  generateAuthToken: function() {
    const payload = {
      id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
      isVerified: this.isVerified
    };

    return jwt.sign(
      payload,
      process.env.JWT_SECRET || "your-super-secret-key-change-this",
      {
        expiresIn: process.env.JWT_EXPIRE || "30d",
        issuer: "recipe-app",
        audience: "recipe-app-users"
      }
    );
  },

  // Gerar token para reset de senha
  generateResetPasswordToken: function() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos
    
    return resetToken;
  },

  // Gerar token para verificação de email
  generateVerifyEmailToken: function() {
    const verifyToken = crypto.randomBytes(32).toString("hex");
    
    this.verifyEmailToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");
    
    this.verifyEmailExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
    
    return verifyToken;
  },

  // Incrementar tentativas de login
  incrementLoginAttempts: function() {
    this.loginAttempts += 1;
    
    // Bloquear conta após 5 tentativas falhas
    if (this.loginAttempts >= 5 && !this.lockUntil) {
      this.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutos
    }
    
    return this.save();
  },

  // Resetar tentativas de login
  resetLoginAttempts: function() {
    this.loginAttempts = 0;
    this.lockUntil = undefined;
    return this.save();
  },

  // Verificar se conta está bloqueada
  isLocked: function() {
    return this.lockUntil && this.lockUntil > Date.now();
  },

  // Adicionar receita aos favoritos
  addFavorite: async function(recipeId) {
    if (!this.favorites.includes(recipeId)) {
      this.favorites.push(recipeId);
      this.stats.favoriteCount += 1;
      await this.save();
    }
    return this;
  },

  // Remover dos favoritos
  removeFavorite: async function(recipeId) {
    const index = this.favorites.indexOf(recipeId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.stats.favoriteCount -= 1;
      await this.save();
    }
    return this;
  },

  // Adicionar receita criada
  addMyRecipe: async function(recipeId) {
    if (!this.myRecipes.includes(recipeId)) {
      this.myRecipes.push(recipeId);
      this.stats.recipeCount += 1;
      await this.save();
    }
    return this;
  },

  // Remover receita criada
  removeMyRecipe: async function(recipeId) {
    const index = this.myRecipes.indexOf(recipeId);
    if (index > -1) {
      this.myRecipes.splice(index, 1);
      this.stats.recipeCount -= 1;
      await this.save();
    }
    return this;
  },

  // Atualizar estatísticas
  updateStats: async function(statsUpdate) {
    Object.keys(statsUpdate).forEach(key => {
      if (this.stats[key] !== undefined) {
        this.stats[key] += statsUpdate[key];
      }
    });
    return this.save();
  },

  // Verificar se é admin
  isAdmin: function() {
    return this.role === "admin";
  },

  // Verificar se é moderador
  isModerator: function() {
    return this.role === "moderator" || this.role === "admin";
  },

  // Verificar se é premium
  isPremium: function() {
    return this.role === "premium" || this.role === "moderator" || this.role === "admin";
  }
};

// ======================
// MÉTODOS ESTÁTICOS
// ======================

UserSchema.statics = {
  // Buscar por email (incluindo senha)
  findByEmail: function(email) {
    return this.findOne({ email }).select("+password +loginAttempts +lockUntil");
  },

  // Buscar por username
  findByUsername: function(username) {
    return this.findOne({ username: username.toLowerCase() });
  },

  // Verificar se username está disponível
  isUsernameTaken: async function(username) {
    const user = await this.findOne({ username: username.toLowerCase() });
    return !!user;
  },

  // Verificar se email está disponível
  isEmailTaken: async function(email) {
    const user = await this.findOne({ email: email.toLowerCase() });
    return !!user;
  },

  // Buscar por token de reset
  findByResetToken: function(token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return this.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  },

  // Buscar por token de verificação
  findByVerifyToken: function(token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return this.findOne({
      verifyEmailToken: hashedToken,
      verifyEmailExpire: { $gt: Date.now() }
    });
  },

  // Buscar usuários online
  findOnlineUsers: function() {
    return this.find({ isOnline: true }).select("username profile.avatar");
  },

  // Buscar top contribuidores
  findTopContributors: function(limit = 10) {
    return this.find({ isActive: true })
      .sort({ "stats.recipeCount": -1, "stats.totalLikes": -1 })
      .limit(limit)
      .select("username profile.avatar stats.recipeCount stats.totalLikes");
  },

  // Estatísticas gerais
  getStats: async function() {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      todayRegistrations,
      userGrowth
    ] = await Promise.all([
      this.countDocuments(),
      this.countDocuments({ isActive: true }),
      this.countDocuments({ isVerified: true }),
      this.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }),
      this.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } },
        { $limit: 30 }
      ])
    ]);

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      todayRegistrations,
      userGrowth
    };
  }
};

// ======================
// ÍNDICES
// ======================

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ "profile.firstName": 1, "profile.lastName": 1 });
UserSchema.index({ role: 1, isActive: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ lastLogin: -1 });
UserSchema.index({ "stats.recipeCount": -1 });
UserSchema.index({ "stats.favoriteCount": -1 });

// Índice de texto para busca
UserSchema.index({
  username: "text",
  email: "text",
  "profile.firstName": "text",
  "profile.lastName": "text"
});

// ======================
// PLUGINS (OPCIONAIS)
// ======================

// Para paginação
const mongoosePaginate = require("mongoose-paginate-v2");
UserSchema.plugin(mongoosePaginate);

// Para validação única em campos customizados
const uniqueValidator = require("mongoose-unique-validator");
UserSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique."
});

// Para campos obrigatórios
UserSchema.plugin(require("mongoose-required-fields"));

module.exports = mongoose.model("User", UserSchema);
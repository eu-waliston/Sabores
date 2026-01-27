const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2'); // Opcional para paginação

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe name is required"],
      trim: true,
      minlength: [3, "Recipe name must be at least 3 characters"],
      maxlength: [100, "Recipe name cannot exceed 100 characters"],
      index: true // Para buscas mais rápidas
    },

    imageURL: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: function(v) {
          // Validação simples de URL
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
        },
        message: props => `${props.value} is not a valid image URL!`
      }
    },

    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
      trim: true
    },

    recipe: {
      instructions: {
        type: [String],
        required: [true, "Instructions are required"],
        validate: {
          validator: function(v) {
            return v.length > 0;
          },
          message: "At least one instruction is required"
        }
      },
      prepTime: {
        type: Number,
        min: [1, "Preparation time must be at least 1 minute"]
      },
      cookTime: {
        type: Number,
        min: [0, "Cook time cannot be negative"]
      },
      servings: {
        type: Number,
        min: [1, "Servings must be at least 1"]
      },
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
      }
    },

    ingredients: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      quantity: {
        type: String,
        required: true
      },
      unit: {
        type: String,
        enum: ['g', 'kg', 'ml', 'L', 'cup', 'tsp', 'tbsp', 'unit', 'pinch'],
        default: 'unit'
      }
    }],

    categories: [{
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Quick', 'Healthy']
    }],

    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true,
        maxlength: 500
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],

    rate: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      set: v => Math.round(v * 10) / 10 // Arredonda para 1 decimal
    },

    ratings: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      value: {
        type: Number,
        min: 1,
        max: 5
      }
    }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    views: {
      type: Number,
      default: 0
    },

    favorites: {
      type: Number,
      default: 0
    },

    isPublished: {
      type: Boolean,
      default: true
    },

    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }]
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para tempo total
RecipeSchema.virtual('totalTime').get(function() {
  return (this.recipe.prepTime || 0) + (this.recipe.cookTime || 0);
});

// Virtual para média de ratings
RecipeSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr.value, 0);
  return sum / this.ratings.length;
});

// Índices para performance
RecipeSchema.index({ name: 'text', description: 'text' }); // Text search
RecipeSchema.index({ rate: -1 });
RecipeSchema.index({ createdAt: -1 });
RecipeSchema.index({ 'categories': 1 });

// Middleware pre-save para calcular rating médio
RecipeSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, curr) => acc + curr.value, 0);
    this.rate = Math.round((sum / this.ratings.length) * 10) / 10;
  }
  next();
});

// Métodos de instância
RecipeSchema.methods = {
  addRating: function(userId, value) {
    const existingRating = this.ratings.find(r => r.user.toString() === userId.toString());
    
    if (existingRating) {
      existingRating.value = value;
    } else {
      this.ratings.push({ user: userId, value });
    }
    
    return this.save();
  },

  addComment: function(userId, text, rating) {
    this.comments.push({
      user: userId,
      text,
      rating
    });
    return this.save();
  },

  incrementViews: function() {
    this.views += 1;
    return this.save();
  },

  toggleFavorite: function() {
    this.favorites += 1;
    return this.save();
  }
};

// Métodos estáticos
RecipeSchema.statics = {
  findByCategory: function(category) {
    return this.find({ categories: category });
  },

  searchRecipes: function(query) {
    return this.find({
      $text: { $search: query }
    }, {
      score: { $meta: "textScore" }
    }).sort({ score: { $meta: "textScore" } });
  },

  getTopRated: function(limit = 10) {
    return this.find({ isPublished: true })
      .sort({ rate: -1 })
      .limit(limit)
      .select('name imageURL rate description');
  },

  getUserRecipes: function(userId) {
    return this.find({ createdBy: userId, isPublished: true });
  }
};

// Plugin para paginação (opcional)
RecipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Recipe", RecipeSchema);
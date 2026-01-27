const { body, param, validationResult } = require('express-validator');

const recipeValidators = {
  create: [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('recipe')
      .notEmpty().withMessage('Recipe instructions are required'),
    body('rate')
      .optional()
      .isFloat({ min: 0, max: 5 }).withMessage('Rate must be between 0 and 5')
  ],
  
  update: [
    param('id').isMongoId().withMessage('Invalid recipe ID'),
    body('rate')
      .optional()
      .isFloat({ min: 0, max: 5 }).withMessage('Rate must be between 0 and 5')
  ],
  
  idParam: [
    param('id').isMongoId().withMessage('Invalid recipe ID')
  ]
};

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  };
};

module.exports = { recipeValidators, validate };
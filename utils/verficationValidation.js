


const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.verifyValidators=[

    
    body("email").trim().isEmail().withMessage("Please provide a valid email address"),
    body("code").matches(/^\d{6}$/).withMessage("code must be 6 digits only"),
  
    validatorMiddleware

]

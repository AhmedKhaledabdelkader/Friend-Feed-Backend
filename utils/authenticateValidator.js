


const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.authenticateValidators=[

    
    body("email").trim().isEmail().withMessage("Please provide a valid email address"),
    body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit'),
    validatorMiddleware

]



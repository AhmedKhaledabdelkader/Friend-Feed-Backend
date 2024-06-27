


const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.getUserValidators=[

    body("username").trim().isLength({min:3,max:25}).withMessage('Username must be between 3 and 20 characters long'),
    body("email").trim().isEmail().withMessage("Please provide a valid email address"),
    body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit'),
    validatorMiddleware

]



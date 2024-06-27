
const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.commentValidators=[

    
body("comment").notEmpty().withMessage("please comment is required"),

body("commentBy").isMongoId().withMessage("commentBy must be a mongoId"),

body("postId").isMongoId().withMessage("postId must be a mongoId"),

validatorMiddleware


    

]

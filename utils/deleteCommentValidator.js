

const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.deletecommentValidators=[

    


body("commentId").isMongoId().withMessage("commentId must be a mongoId"),

body("postId").isMongoId().withMessage("postId must be a mongoId"),

validatorMiddleware


    

]

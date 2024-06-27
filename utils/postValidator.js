

const { body} = require('express-validator');
const validatorMiddleware = require('../middleware/validationmiddleware');



module.exports.getPostValidators=[

    

    body("postBy").isMongoId().withMessage("you must enter a mongo id"),
  
    validatorMiddleware

]

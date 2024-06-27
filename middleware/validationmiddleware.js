
const { validationResult } = require('express-validator');

const validatorMiddleware=(req,res,next)=>{

    const result = validationResult(req);
    if (!result.isEmpty()) {

let myErrors=[]
for(let i in result.array()){

myErrors.push(result.array()[i].msg)

}





        return res.status(400).json({ errors:result.array()});
    
    }

    next()
  



}


module.exports=validatorMiddleware
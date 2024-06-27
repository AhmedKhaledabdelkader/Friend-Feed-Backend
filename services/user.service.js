
const mongoose=require("mongoose")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const { sendEmail } = require("../email/sendEmail")

const asyncHandler=require("express-async-handler")
const ApiError = require("../utils/ApiError")


var otpCode={}

module.exports.registerUser=asyncHandler(async(req,res,next)=>{


    let{username,email,password,userImage,role}=req.body

const user=await userModel.findOne({username})

if(user){


  //  return res.status(400).json({message:"username already exist"}) 


  return next(new ApiError("username already exist",400))



}

else{


    const checkEmail=await userModel.findOne({email})

    if(checkEmail){


      //  return res.status(400).json({message:"email already exist"}) 

      return next(new ApiError("email already exist",400))



    }

    else{

       if(req.file){


        bcrypt.hash(password,4,async(err,hash)=>{



            
            await userModel.insertMany({username,email,password:hash,userImage:req.file.filename,role})



           
           let code = Math.floor(100000 + Math.random() * 900000);
           let codeInStr=code.toString()
          let codeStr = code.toString().replace(/./g, "$& ");

          otpCode.sentCode=codeInStr
          otpCode.email=email
          
            sendEmail({email,secret:codeStr,message:"hello"})

            res.status(200).json({

                message:"user add sucessfully to Friend Feed please verify your email"
            })


            



        })
       }

       else{

       // res.status(400).json({message:"images only"})

       return next(new ApiError("images only",400))

       }

     


    }





}


})


module.exports.authenticateUser=asyncHandler(async(req,res,next)=>{


let{email,password}=req.body


let user=await userModel.findOne({email})

if(user){

if(user.isVerified){
    let isMatch=await bcrypt.compare(password,user.password)

    if(isMatch){


        let token=jwt.sign({id:user._id,name:user.username,email:user.email,userImage:user.userImage,role:user.role},process.env.PRIVATE_KEY,{ expiresIn: '3h' })



        res.status(200).json({

            message:"login sucessfully to Friend Feed",
            token:token,

        })





    }

    else{

    //    res.status(400).json({message:"password is incorrect for this email "})

        return next(new ApiError("password is incorrect for this email ",400))

    }

}

else{

   // res.status(400).json({message:" this email not verified please verify your email"})

    return next(new ApiError("this email not verified please verify your email",400))


}


}
else{


 //   res.status(404).json({message:"this email not in FriendFeed"})

    return next(new ApiError("this email not in FriendFeed",404))


}




})


module.exports.verifyEmail=asyncHandler(async(req,res,next)=>{

let{code,email}=req.body

if(otpCode.sentCode==code && otpCode.email==email){


    await userModel.updateOne({email:email},{$set:{isVerified:true}})


    res.status(200).json({message:"verifing email done"})


}

else{

//res.status(400).json({message:"something wrong in verfication code or email"})

return next(new ApiError("something wrong in verfication code or email",400))

}







})




module.exports.getUser=asyncHandler(async(req,res,next)=>{


    let{userId}=req.params


    let user=await userModel.findById(userId,{password:0});


    if(user){

res.status(200).json({

    result:user

})

    }


    else{


        next(new ApiError("user not found",404))


    }



})


module.exports.getMyFriends=asyncHandler(async(req,res,next)=>{

    
    let userId=req.userId
    
    
    let user =await userModel.findOne({_id:userId}).populate({
    
        path:"friends",
        select:"-password"
    
    
    });

    if (user.friends==0) {
        
        return next(new ApiError("No Friends for you",404))
    }
    
    
    res.status(200).json({
    
    
       user:user
    
    })


})





/*........search friend..........*/



/*
module.exports.searchFriends = asyncHandler(async (req, res) => {
    let userId = req.userId;

    let {friendName}=req.query;
  
    let user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    let friends = user.friends; 
  
   
    let friendsWithName = await Promise.all(friends.map(async (friendId) => {
      let friend = await userModel.findById(friendId);
      if (friend) {
        return friend.username; 
      }
      return null; 
    }));


    let searchfriends=friendsWithName.map((friend)=>{

if (new RegExp(friendName, "i").test(friend)) {

    console.log(friend);

    return friend;

}



    })



  
    res.status(200).json({ result: searchfriends });
  });
*/







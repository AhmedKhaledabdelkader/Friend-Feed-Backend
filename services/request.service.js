
const mongoose=require("mongoose")
const requestModel = require("../models/request.model")
const userModel = require("../models/user.model")
const asyncHandler=require('express-async-handler')
const ApiError = require("../utils/ApiError")




module.exports.sendRequest=asyncHandler(async(req,res,next)=>{


    let{senderUser,recieverUser}=req.body

    let checkingSenderUser=await userModel.findOne({_id:senderUser})

    let checkingrecieverUser=await userModel.findOne({_id:recieverUser})


    if(checkingSenderUser && checkingrecieverUser){
      
       

        if(!checkingrecieverUser.friends.includes(checkingSenderUser._id)){


            let count=0 ;

            for(let friend of checkingrecieverUser.friends){


                if(checkingSenderUser.friends.includes(friend)){

                    count++ ;

                }




            }




            

    await requestModel.insertMany({senderUser,recieverUser,mutalFriends:count})


    res.status(200).json({


        message:"request sent sucessfully"

    })
    }

    else{

        return next(new ApiError("they are arleady friends",400))

    }

}

    else{


return next(new ApiError("not founding happen for senderUser or reciverUser",404))


    }


})

module.exports.checkRequest=asyncHandler(async(req,res,next)=>{

let{requestId,replyRequest}=req.body

let request=await requestModel.findOne({_id:requestId})

if(request){

if(replyRequest=="accept"){

await requestModel.updateOne({_id:requestId},{$set:{friendshipStatus:replyRequest}})

await userModel.updateOne({_id:request.recieverUser},{$push:{friends:request.senderUser}})

await userModel.updateOne({_id:request.senderUser},{$push:{friends:request.recieverUser}})

res.status(200).json({
    message:"accepting request done the two user made a friend relationship"
})

}

//else

await requestModel.updateOne({_id:requestId},{$set:{friendshipStatus:replyRequest}})

res.status(200).json({

    message:"rejecting request done"
})




}

else{

return next(new ApiError("there no request with this id",404))

}




})



module.exports.getUsersWhoRequestedMe=asyncHandler(async(req,res,next)=>{


    const userId=req.userId

    let request=await requestModel.find({friendshipStatus:"pending",recieverUser:userId}).populate({

path:"senderUser",

select:"-password"


    })


    if(request.length>0){


        res.status(200).json({


            result:request

        })


    }



    else{


        return next(new ApiError("No Requests Found",404))



    }








})



module.exports.addFriends=asyncHandler(async(req,res,next)=>{


   let ownUser=await userModel.findOne({_id:req.userId})

   if (ownUser) {
    
    let friends=ownUser.friends


    friends.push(ownUser._id)


    let users=await userModel.find({_id:{$nin:friends}})

let mutalCount ;
let mutakCountArr=[]

let skipUser=false ;

    for(let user of users){ // i make the two for loops to get the mutal friends for every user

        mutalCount=0


     /*   let requests=await requestModel.find({})


        for(let request of requests){ // i make this loop to disapear addfriend that sent request for me


            if(user._id.equals(request.recieverUser) && request.friendshipStatus==="pending"){

        console.log("jjhj");
        skipUser=true;
        break

            }


        }*/


        let checkConfirmRequest=await requestModel.find({$or:[{senderUser:ownUser,recieverUser:user._id},
            {senderUser:user._id,recieverUser:ownUser}],
            friendshipStatus:"pending"})

            if (checkConfirmRequest.length>0) {

                continue

                
            }






       /* if (skipUser) {

            continue ;
            
        }
*/

        let recieverUserRequest=await userModel.findOne({_id:user._id})


        let recieverUserFriends=recieverUserRequest.friends ;



        for(let friend of friends){


            if (recieverUserFriends.includes(friend)) {


                mutalCount++
                
            }


        }
mutakCountArr.push({user,mutalCount})

    }



    if (mutakCountArr.length==0) {

        return next(new ApiError("No Requests For You",404))
        
    }


    res.status(200).json({


        

        result:mutakCountArr


    })


   }

   else{


return next(new ApiError("user not found",404))



   }







})


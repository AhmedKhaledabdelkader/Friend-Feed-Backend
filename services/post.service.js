/*............*/


const mongoose=require("mongoose")
const postModel = require("../models/post.model")
const userModel = require("../models/user.model")

const asyncHandler=require("express-async-handler")
const ApiError = require("../utils/ApiError")


module.exports.addPost=asyncHandler(async(req,res,next)=>{


let{postDesc,postImage,postBy}=req.body

if(req.file){

await postModel.insertMany({postDesc,postImage:req.file.filename,postBy})


res.status(200).json({message:"post added sucess to friend feed"})

}

else{

return next(new ApiError("please enter images only in post's image",400))

}


})


module.exports.deletePost=asyncHandler(async(req,res,next)=>{


    let{id}=req.params

    

    let post= await postModel.findOne({_id:id})

   

    if(post){

        if(req.userId==post.postBy){
        await postModel.findByIdAndDelete(id)

        res.status(200).json({message:"post is deleted from FriendFeed"})

        }

        else{

            return next(new ApiError("you don't have a permission for deleting this post"),400)

        }

    }


    else{

      //  res.status(404).json({message:"there is no post in FriendFeed System with this id"})

      return next(new ApiError("there is no post in FriendFeed System with this id",404))


    }
    





})



module.exports.getAllPosts=asyncHandler(async(req,res,next)=>{


    let posts=await postModel.find({}).sort({_id:-1}).populate({


        path:'postBy',
        select:'-password' // if you want to not select email and password select:"-password -email"


    }).populate({

        path:"comments.commentBy",
        select:'-password'
    })

    if(posts.length>0){

        res.status(200).json({message:"returning posts sucess",result:posts})

    }


   // res.status(404).json({message:"No Posts Here "})

   return next(new ApiError("No Posts Here",404))





})


module.exports.getSpecficPost=asyncHandler(async(req,res,next)=>{


    let{id}=req.params


    let post=await postModel.findOne({_id:id}).populate({

        path:"postBy",
        select:'-password' 

    })

    if(post){


        res.status(200).json({message:"get specfic post sucess",result:post})


    }


    else{


      //  res.status(404).json({message:"there is no post with this id in FriendFeed System"})

      return next(new ApiError("there is no post with this id in FriendFeed System",404))

    }




})


module.exports.updatePost=asyncHandler(async(req,res,next)=>{


    let{postId,postDesc,postImage}=req.body
if(req.file){

    let post=await postModel.findOne({_id:postId})

    if(post){

        if(req.userId==post.postBy){

      let updatedPost=  await postModel.findByIdAndUpdate(postId,{postDesc,postImage:req.file.filename},{new:true})


      res.status(200).json({

        message:"post updated sucessfully",

        updatedPost


      })

    }

    else{

        return next(new ApiError("you don't have a permission to update this post",400))

    }



    }

    else{



        return next(new ApiError("the is no post with this id",404))



    }

}

else{

    return next(new ApiError("please attach an image to a file",400))

}






})


module.exports.manageLikePost=asyncHandler(async(req,res,next)=>{


    let{userId,postId}=req.body


    let user=await userModel.findOne({_id:userId})

    let post=await postModel.findOne({_id:postId})

   
if(user){
      
if(post){
    if(!post.likeCount.users.includes(userId)){


        await postModel.updateOne({_id:postId},{$inc:{"likeCount.count":1},$push:{"likeCount.users":userId}})

        res.status(200).json({

            message:"user likes post"
        })


    }
    else{


        await postModel.updateOne({_id:postId},{$inc:{"likeCount.count":-1},$pull:{"likeCount.users":userId}})

        res.status(200).json({

            message:"user remove like from post"
        })


    }

}

else{


  /*  res.status(404).json({

        message:"post not found"
    })*/

    return next(new ApiError("there is no post with this id",404))

}
}

else{


    return next(new ApiError("there no user with this id",404))




}


})


module.exports.addComment=asyncHandler(async(req,res,next)=>{


    let{comment,commentBy,postId}=req.body

    let user=await userModel.findOne({_id:commentBy})

    if(user){

    let post=await postModel.findOne({_id:postId})

    if(post){


        await postModel.updateOne({_id:postId},{$push:{comments:{comment,commentBy}}})

        res.status(200).json({


            message:"adding comment sucessfully to the post"

        })


    }
    else{

     


        return next(new ApiError("there no post with this id",404))



    }

}
else{


    return next(new ApiError("there no user with this id",404))

}




})

// i give a premission to the owner's comment and the owner of the post to delete comment no one else can delete the comment
module.exports.deleteComment=asyncHandler(async(req,res,next)=>{


    let{postId,commentId}=req.body


    let post=await postModel.findOne({_id:postId})

    
      
    if(post){

        let comment=await postModel.findOne({"comments._id":commentId})

        if(comment){

           let commentBy ; 

       for(let i of comment.comments){ // i make this loop to get the id of the user that create a comment

       if(i["_id"]==commentId){

          commentBy=i["commentBy"]        


       } 

       }

          
            
        if(req.userId==post.postBy || req.userId==commentBy){

        await postModel.updateOne({_id:postId},{$pull:{comments:{_id:commentId}}})

        res.status(200).json({


            message:"comment is deleted from the post"

        })
    }

else{


    return next(new ApiError("you don't have a permission to do this",400))

}



    }

    else{

  //      res.status(404).json({message:" comment with this id not found"})

        return next(new ApiError(" comment with this id not found",404))
    }

    }
    else{


        

        return next(new ApiError(" post with this id not found",404))


    }








})


module.exports.updateComment=asyncHandler(async(req,res,next)=>{


    let{postId,commentId,updatedComment}=req.body


    let post=await postModel.findOne({_id:postId})
      
    if(post){

        let comment=await postModel.findOne({"comments._id":commentId})

        if(comment){

            let commentBy ; 

            for(let i of comment.comments){
     
            if(i["_id"]==commentId){
     
               commentBy=i["commentBy"]        
     
     
            } 
     
            }
     
               
                 
             if(req.userId==commentBy){

            
        await postModel.updateOne({_id:postId,"comments._id":commentId},{$set:{comments:{comment:updatedComment,_id:commentId,commentBy:commentBy}}})

        res.status(200).json({


            message:"comment is updated"

        })
    }
    else{

        return next(new ApiError("you don't have permission for this",400))

    }
}

    else{


        return next(new ApiError("comment with this id not found",404))
    }

    }
    else{


        return next(new ApiError("post with this id not found",404))


    }




}
)


// show posts of friends only


module.exports.showPostsFriendsOnly=asyncHandler(async(req,res,next)=>{


    
    
    
    let user=await userModel.findOne({_id:req.userId}) // req.userid from header from token

  
    if(user){



    let posts=await postModel.find({postBy:{$in:user.friends}}).populate({

        path:"postBy",
        select:"-password"



    }).populate({

        path:"comments.commentBy",
        select:'-password'


    })


    if(posts.length>0){


        res.status(200).json({


            message:"returning posts friends sucess",

            result:posts



        })


    }


    else{

      
        return next(new ApiError("There No Posts For Your Friends",404))



    }

    }

    else{


        return next(new ApiError("there is no user with this id",404))


    }





})


module.exports.getUserPosts=asyncHandler(async(req,res,next)=>{


    let{userId}=req.params

    let user=await userModel.findOne({_id:userId})

    if(user){

        let posts=await postModel.find({postBy:userId}).sort({_id:-1}).populate({

path:"postBy",

select:"-password"



        }).populate({


            path:"comments.commentBy",
            select:"-password"


        })

        if(posts.length>0){

            res.status(200).json({


                result:posts

            })

        }

        else{

           // res.status(200).json({message:"No Posts Here"})

           return next(new ApiError(`No Posts Found For ${user.username} `,404))

        }


    }

    else{

        return next(new ApiError("there is no user with this id",404))


    }


})
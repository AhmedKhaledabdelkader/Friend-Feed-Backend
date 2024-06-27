

const mongoose=require("mongoose")


const postSchema=mongoose.Schema({


    postDesc:String ,

    postImage:{

        type:String,

        required:[true,"postImage is required"]

    },


    postBy:{

        type:mongoose.Types.ObjectId,
        ref:"user"
    },


   /* likeCount:{

        type:Number,
        default:0

    },*/


    likeCount:{


        count:{

            type:Number,
            default:0

        },

        users:{

            type:[mongoose.Types.ObjectId],
            ref:"user"

        }



    },


    comments:[{

        comment:{

            type:String,
            required:[true, "comment is requird"]

        },

        commentBy:{

            type:mongoose.Types.ObjectId,
            ref:"user"

        },

        createdAt:{

            type:Date,
            default:Date.now

        }




    }]







},{timestamps:true})


postSchema.post("init",function(doc){

    doc.postImage="http://localhost:3000/"+doc.postImage
    
    
    
    });


const postModel=mongoose.model("post",postSchema);


module.exports=postModel
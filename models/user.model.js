
const mongoose=require("mongoose")



const userSchema=mongoose.Schema({


    username:{

        type:String,

        required:[true,"username is required"],

        unique:true


    },

    
    email:{

        type:String,

        required:[true,"email is required"],

        unique:true


    },


    password:{

        type:String,

        required:[true,"password is required"]
    },

    
    role:{

        type:String,

        enum:["user","admin"],

        default:"user"

    },

    
    userImage:{

        type:String,

        required:[true,"image is required"]
    },


    friends: [
        { type:mongoose.Types.ObjectId, 
           ref: 'user',
           
         }
    ] 

,
    isVerified:{


        type:Boolean,

        default:false


    }









})


userSchema.post("init",function(doc){

    doc.userImage="http://localhost:3000/"+doc.userImage
    
    
    
    });


const userModel=mongoose.model("user",userSchema);

module.exports=userModel
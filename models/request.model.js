

const mongoose=require("mongoose")



const requestSchema=mongoose.Schema({


senderUser:{

type:mongoose.Types.ObjectId,

ref:"user"


},

recieverUser:{

    type:mongoose.Types.ObjectId,
    
    ref:"user"
    
    
    },



friendshipStatus:{

    type:String,

    enum:["accept","reject","pending"],

    default:"pending"





},

mutalFriends:{

    type:Number,
    default:0 
}




},{timestamps:true})



const requestModel=mongoose.model("request",requestSchema)

module.exports=requestModel
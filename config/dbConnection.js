

const mongoose=require("mongoose")


const dbConnection=()=>{


    mongoose.connect(process.env.DB_URL).then(
     ()=>{
        console.log("database is connected");
     }
    )
   /* .catch(

    ()=>{
        console.log("error in connection in database");
    }
    )*/


}
module.exports=dbConnection
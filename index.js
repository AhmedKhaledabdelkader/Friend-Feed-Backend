
const express=require("express")
const dbConnection = require("./config/dbConnection")
const dotenv=require("dotenv")
const cors=require("cors")
const swaggerJsDocs=require("swagger-jsdoc") ;
const swaggerUi=require("swagger-ui-express")
const ApiError = require("./utils/ApiError")
const globalError = require("./middleware/globalErrorHandling");
const { makeSwagger } = require("./swaggerApi/swagger");
dotenv.config()


const app=express()

app.use(cors())

app.use(express.static("uploads"))

app.use(express.json())




app.use("/api/user",require("./apis/user.api"))

app.use("/api/post",require("./apis/post.api"))


app.use("/api/request",require("./apis/request.api"))


/*app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(makeSwagger()))*/


app.all("*",(req,res,next)=>{


   // const err=new Error(`can't find this route with ${req.originalUrl}`)

    next(new ApiError(`can't find this route with ${req.originalUrl}`,500))


})


//global error handling for express
app.use(globalError)




dbConnection();

const server=app.listen(process.env.PORT,()=>{

    console.log("server is connected");
    
    })


// handle the error outside express (rejection(promise)(async))

process.on("unhandledRejection",(err)=>{

    console.error(`unhandledRejections Errors: ${err.message} | ${err.name}`);

    server.close(()=>{


        console.log("shuttinng down ");//shutdown server

        process.exit(1) // shutdown to application

    })// i make shutdown server before shutdown application to avoid request pending



})
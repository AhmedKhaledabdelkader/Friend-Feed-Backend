const verifyToken = require("../middleware/authenticationmiddleware")
const { sendRequest, checkRequest, getUsersWhoRequestedMe, addFriends } = require("../services/request.service")

const express=require("express").Router()



express.post("/make",verifyToken,sendRequest)

express.put("/check",verifyToken,checkRequest)

express.get("/confirm",verifyToken,getUsersWhoRequestedMe)


express.get("/addfriends",verifyToken,addFriends)



module.exports=express
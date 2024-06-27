const { uploadImage } = require("../common/uploadImage")
const verifyToken = require("../middleware/authenticationmiddleware")
const { registerUser, authenticateUser, verifyEmail, getUser, getMyFriends, searchFriends } = require("../services/user.service")
const { authenticateValidators } = require("../utils/authenticateValidator")
const { getUserValidators } = require("../utils/userValidator")
const { verifyValidators } = require("../utils/verficationValidation")

const express=require("express").Router()



express.post("/register",uploadImage("userImage"),getUserValidators,registerUser)

express.post("/login",authenticateValidators,authenticateUser)

express.post("/verify",verifyValidators,verifyEmail)

express.get("/myfriends",verifyToken,getMyFriends)


express.get("/:userId",verifyToken,getUser)







module.exports=express
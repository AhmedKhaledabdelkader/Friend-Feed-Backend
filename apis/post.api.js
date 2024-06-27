const { uploadImage } = require("../common/uploadImage")
const verifyToken = require("../middleware/authenticationmiddleware")
const { addPost, deletePost, getAllPosts, getSpecficPost, updatePost, manageLikePost, addComment, deleteComment, updateComment, showPostsFriendsOnly, getUserPosts } = require("../services/post.service")
const { commentValidators } = require("../utils/commentValidator")
const { deletecommentValidators } = require("../utils/deleteCommentValidator")
const { getPostValidators } = require("../utils/postValidator")


const express=require("express").Router()




express.post("/add",uploadImage("postImage"),getPostValidators,verifyToken,addPost)

express.delete("/delete/:id",verifyToken,deletePost)

express.get("/",verifyToken,getAllPosts)

express.get("/show",verifyToken,showPostsFriendsOnly) // endpoint posts for friends only

express.get("/:id",verifyToken,getSpecficPost)

express.get("/user/:userId",verifyToken,getUserPosts)


express.put("/update",verifyToken,uploadImage("postImage"),updatePost)

express.put("/update/like",verifyToken,manageLikePost)

express.put("/comment/add",verifyToken,commentValidators,addComment)

express.put("/comment/delete",verifyToken,deletecommentValidators,deleteComment)

express.put("/comment/update",verifyToken,updateComment)


module.exports=express

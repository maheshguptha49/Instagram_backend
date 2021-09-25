const {Router}=require('express')
const authenticate=require("../middlewares/authentication")
const Post=require('../models/post.model')
const router=Router()
const authorize=require("../middlewares/authorization")
router.get("",authenticate,authorize(["admin"]),async (req, res) => {
    console.log(req.user)
    res.status(200).json({message:"authenticated "})
})

module.exports=router

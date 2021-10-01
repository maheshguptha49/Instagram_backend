const {Router}=require('express')
const authenticate=require("../middlewares/authentication")
const Post=require('../models/post.model')
const Comment=require('../models/comment.model')
const Activity=require("../models/activity.model")
const router=Router()
const authorize=require("../middlewares/authorization")
async function attachLikesCount(comments,Activity){
    for(let i=0; i<comments.length; i++){
        let activity=await Activity.find({parentId: comments[i]["_id"]})
        comments[i]["Likecount"]=activity.count;
    }
    return comments;
}
router.get("",async (req, res) => {
    // add pagination 
    const comments=await Comment.find()
    comments=await attachLikesCount(comments,Activity)
    res.status(200).json({data: comments})
})
router.get("/:id",async (req, res) => {
    // add pagination 
    const comments=await Comment.find({parentId:req.params.id})
    comments=await attachLikesCount(comments,Activity)
    res.status(200).json({data: comments})
})

router.post("",async (req, res) => {

    const comment=await Comment.create(req.body)
    res.status(200).json({data: comment})
})

module.exports=router

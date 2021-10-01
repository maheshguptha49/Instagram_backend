const {Router}=require('express')
const authenticate=require("../middlewares/authentication")
const Post=require('../models/post.model')
const Activity=require("../models/activity.model")
const router=Router()
const authorize=require("../middlewares/authorization")
async function attachLikesCount(posts,Activity){
    for(let i=0; i<posts.length; i++){
        let activity=await Activity.find({parentId: posts[i]["_id"]})
        posts[i]["Likecount"]=activity.count;
    }
    return posts;
}
router.get("",async (req, res) => {
    // add pagination 

    const posts=await Post.find()
    posts=await attachLikesCount(posts,Activity)
    res.status(200).json({data: posts})
})

router.post("",async (req, res) => {
    const post=await Post.create(req.body)
    res.status(200).json({data: post})
})

module.exports=router

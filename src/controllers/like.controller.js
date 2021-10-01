const {Router}=require('express')

const router=Router()
const Activity=require("../models/activity.model")
const Like=require("../models/like.model")

router.post('',async (req, res)=>{
    const like=await Like.create(req.body)
    const update=await Activity.findOneAndUpdate({parentId:req.parentId},{count:count+1})
    res.status(201).create(req.body)

})
router.get('',async (req, res)=>{
    
})
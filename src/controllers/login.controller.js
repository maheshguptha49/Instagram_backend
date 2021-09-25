const {Router}=require('express')
const router=Router()

const User = require("../models/user.model")
const jwt =require("jsonwebtoken")
require("dotenv").config()
const newToken=(user)=>{
   
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}



const login=async (req, res) => {
    // we will check if the user is in our system or not and if user is not there we will send 400
    let user;
    try{
        user=await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send({message:"email or password is wrong"})
        //if there is a user we  will compare password and return respective messages
        const match=await user.checkPassword(req.body.password)
        const token=newToken(user)
        res.status(200).json({token})
    }
    catch(er){
        res.status(400).json({message:"email or password is wrong"})
    }
}

router.post("",login)
module.exports=router
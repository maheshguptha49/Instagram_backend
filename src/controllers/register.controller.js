const {Router}=require('express')
const router=Router()
const fileUpload=require('../middlewares/fileupload')
const {body,validationResult}=require("express-validator")

const User = require("../models/user.model")
const jwt =require("jsonwebtoken")
require("dotenv").config()
const newToken=(user)=>{
   
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}



const register=async (req, res) => {
    // validate the request first
    const errors=validationResult(req)
    // console.log(errors,"errors")
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //we will see wheather user is in our db and if he is we will send user is already registered
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({message:"user is already registered fellow sorry"})
        }
        //if there is no user we will register him and send him a token 
        const profile_picture=req?.file?.path
        console.log(profile_picture,"profile_picture")
        if(profile_picture){
            req.body.roles=req.body?.roles?.split(" ")
            user=await User.create({...req.body,profile_picture})
        }
        else{
            user=await User.create(req.body)
        }
        
        const token=newToken(user)
        // console.log(token,"token")
        return res.status(201).json({user,token})
    }
    catch(err){
        // console.log(err,"err")
        res.status(500).json({status:"failed",message:"something went wrong in our side",err:err})
    }
}
router.post("",
fileUpload.single("profile_picture"),
body("name").notEmpty().withMessage("name should not be empty"),
body("email").notEmpty().withMessage("email should not be empty").isEmail().withMessage("email should be valid email address"),
body("password").notEmpty().withMessage("password should not be empty"),register)
module.exports=router
const User = require("../models/user.model")
const jwt =require("jsonwebtoken")
require("dotenv").config()
const newToken=(user)=>{
   
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}
const register=async (req, res) => {
    //we will see wheather user is in our db and if he is we will send user is already registered
    try{
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({message:"user is already registered fellow sorry"})
        }
        //if there is no user we will register him and send him a token 
        user=await User.create(req.body)
        const token=newToken(user)
        console.log(token,"token")
        return res.status(201).json({user,token})
    }
    catch(err){
        console.log(err,"err")
        res.status(500).json({status:"failed",message:"something went wrong in our side",err:err})
    }
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
module.exports={
    register,
    login
}
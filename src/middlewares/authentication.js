const jwt=require('jsonwebtoken')

const verifyToken=token=>{
   return new Promise((resolve,reject) => {
       jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
           if(err) reject(err)
           if(user) resolve(user)
       })
   })
}
const authenticate=async (req, res, next) => {
    // we will see is there a bearertoken in the headers first and send 400 if there is no bearer token
    let bearertoken=req?.headers?.authorization
    if(!bearertoken || !bearertoken.startsWith("Bearer")) return res.status(400).json({message:"Invalid bearer token send correctly fellow"})
    bearertoken =bearertoken.split(" ")[1]
    // console.log(bearertoken,"bearertoken")

    // if there is a bearer token, we will verify that and attach user to the request because it may be useful for the controller thats using our middleware 
    let user;
    try{
        user=await verifyToken(bearertoken)
    }
    catch(err){
        console.log(err,"err in authorisation")
        return res.status(400).json({message:"wrong token buddy sorry"})
    }
    req.user=user.user
    next()
}
module.exports=authenticate;
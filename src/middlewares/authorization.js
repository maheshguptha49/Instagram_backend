const authorize=(allowedPeople)=>{
    //we are using closures to take the req,res from middleware we will pass some things in authorisation
    return (req,res,next)=>{
        //we will have user in req so we will see his role and authorise him if he is in the allowedPeople 
        // console.log(req.user,"user ")
        const roles=req.user.roles||[]

        // console.log(roles,"roles in user")
        const filteredRoles=allowedPeople.filter((item)=>{
            return roles.includes(item)
        })
        // console.log(filteredRoles,"filteredRoles")
        if(filteredRoles.length>0){
            next()
        }
        else{
            res.status(400).json({status:"failed",message:"you are not allowed sorry mate"})
        }
    }
}
module.exports=authorize
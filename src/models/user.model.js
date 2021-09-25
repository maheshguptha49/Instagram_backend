const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    roles:{type:Array, required:true},
    profile_picture:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})
 
userSchema.pre("save", function (next){
    if(!this.isModified("password")) return next();
    const hash=bcrypt.hash(this.password,8)
    this.password=hash
    next()
})

userSchema.methods.checkPassword = function(password){
    const passwordhash=this.password
    return bcrypt.compareSync(password,passwordhash)
}

const User=mongoose.model('user',userSchema)
module.exports=User

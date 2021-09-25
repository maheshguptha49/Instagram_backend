const mongoose = require('mongoose')

const postSchema=mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    body:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})

const Post = mongoose.model("post",postSchema)
module.exports = Post
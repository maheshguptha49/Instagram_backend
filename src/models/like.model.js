const mongoose = require('mongoose')

const likeSchema=mongoose.Schema({
    parentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,required},
    type:{type:String,required:true,enum : ['comment','post'],},
})

const Like=mongoose.model('like',likeSchema)
module.exports=Like
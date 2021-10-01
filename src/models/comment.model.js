const mongoose = require('mongoose')

const commentSchema=mongoose.Schema({
    parentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,required},
    type:{type:String,required:true,enum : ['comment','post'],},
})

const Comment=mongoose.model('comment',commentSchema)
module.exports=Comment
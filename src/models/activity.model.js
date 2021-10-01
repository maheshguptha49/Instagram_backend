const mongoose = require('mongoose')

const activitySchema=mongoose.Schema({
    parentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    count:{type:Number,required:true},
})
const Activity=mongoose.model('activity',activitySchema)
module.exports = Activity
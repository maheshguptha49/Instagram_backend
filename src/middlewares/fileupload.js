const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    //needs twp things destination and filename we need to give the object which has two functions
    destination:function (req,file,callback){
        // console.log("file fileFilter running... in destination")

        //callback needs two arguments error pathname 
        callback(null,path.join(__dirname,"../uploads"))
    },
    filename:function(req,file,callback){
        const uniqueSuffix=Date.now()+"-"+Math.round(Math.random*1e9)+file.originalname
        //we need to provide unique name for the file and pass it to the callback
        callback(null,uniqueSuffix)
    }
})
const fileFilter=(req,file,callback)=>{
    // console.log("file fileFilter running...")

    // we are checking for the mimetype and sending true or false in the callback given in fileFilter
    if(file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}
module.exports =multer({
    storage,
    fileFilter,
    limits:1024*1024*5
})

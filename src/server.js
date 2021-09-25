const express=require('express')
const connect=require("./config/db")
const loginController=require("./controllers/login.controller")
const registerController=require("./controllers/register.controller")

const postController=require("./controllers/post.controller")
const app = express()
app.use(express.json())

app.use("/posts",postController)
app.use("/login",loginController)
app.use("/register",registerController)
app.listen(8000,async ()=>{
    await connect()
    console.log("listening on port 8000 instagram")
})
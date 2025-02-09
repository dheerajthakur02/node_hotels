const express=require("express")
const db=require("./db.js")
const { json } = require("body-parser");
const bodyParser=require("body-parser")
const personRoutes=require("./routes/personRoutes.js")
const menuRoutes=require("./routes/menuRoutes.js")
require("dotenv").config()
const PORT=process.env.PORT||3000
const app=express();
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    console.log("Server is working..")
    res.send("Welcome to our hotel..");
})

//use routes
app.use("/person",personRoutes)
app.use("/menu",menuRoutes)


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

const express=require("express")
const db=require("./db.js")
const { json } = require("body-parser")
const bodyParser=require("body-parser")
const passport=require("./auth.js")
const app=express(); //making server using express

//Using dotenv for eniviromental variables
require("dotenv").config()
const PORT=process.env.PORT||4000

app.use(bodyParser.json()) //req.body

//Middleware functions
const logRequest = (req,res,next) =>{
  console.log(`[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`)
  next() // Move on to the next phase
}
app.use(logRequest)  // when we use this it will done for all routes

app.use(passport.initialize())
const localAuthMiddileware=passport.authenticate("local",{session:false})
app.get("/",(req,res)=>{ 
    console.log("Server is working..")
    res.send("Welcome to our hotel..");
})
// app.get("/",(req,res)=>{ // if we  get("/",logRequest,(req,res)) , Then it will only work of "/" route
//   console.log("Server is working..")
//   res.send("Welcome to our hotel..");
// })
//importing the router files
const personRoutes=require("./routes/personRoutes.js")
const menuRoutes=require("./routes/menuRoutes.js")

//use routers
app.use("/person",personRoutes) 
app.use("/menu",menuRoutes)

// app.use("/person",logRequest,personRoutes) 
//if we do this then this middleware works only for person routes

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})

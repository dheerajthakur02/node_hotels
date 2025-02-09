const express=require("express")

const app=express();

app.get("/",(req,res)=>{
     res.send("server is running..\n How may i help you sir");
})
app.get("/paneer",(req,res)=>{
    res.send("order of paneer confirmed by me!!! Thanku")
})
app.get("/idli",(req,res)=>{
    let customized_idli={
        name:"idli",
        size:"full",
        want_sambar:true,
        want_chutney:false
    }
    res.send(customized_idli)
})

app.post("/order",(req,res)=>{
    res.send("ordere placed successfully!!")
})
let port=3000
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

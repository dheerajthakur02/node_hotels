const express=require("express")
const router=express.Router()
const MenuItem=require("../models/menuItem.js")

router.get("/",async(req,res)=>{
    try{
       const data=await MenuItem.find()
       res.status(200).json(data)
    }catch(error){
       console.log(error)
       res.status(500).json({error :'internal server error'})
    }
})
router.post("/",async(req,res)=>{
    try{
       let data=req.body
       newMenuItem= new MenuItem(data)
       let response=await newMenuItem.save()
       console.log("data saved")
       res.status(200).json(response)
   }catch(error){
       console.log(error)
       res.status(500).json({error:"Internal server error"})
    }
})
router.get("/:taste",async(req,res)=>{
      try{
           const tasteType=req.params.taste
           if(tasteType=="sour" ||tasteType=="spicy"||tasteType=="sweet"){
             const response=await MenuItem.find({taste:tasteType})
             console.log("response fecthed")
             res.status(200).json(response)
           }else{
             return res.status(404).json({error:"Not found"})
           }
      }catch(err){
         console.log(err)
         res.status(500).json({error:"Internal server error"})
      }
})

router.put("/:id",async(req,res)=>{
      try{
          const menu_id=req.params.id
          const updatedMenu=req.body
          const response=await MenuItem.findByIdAndUpdate(menu_id,updatedMenu,{
            new:true,
            runValidators:true
          })
          if(!response){
            console.log("menu not found")
            res.status(404).json({error:"menu not found"})
          }
          console.log("menu updated")
          res.status(200).json(response)
      }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
      }
})

router.delete("/:id",async(req,res)=>{
      try{
        const menu_id=req.params.id
        const response=await MenuItem.findOneAndDelete(menu_id)
        if(!response){
            console.log("menuItem not found")
            return res.status(404).json({error:"menuitem not found"})
        }
        console.log("menu item deleted successfully!")
        res.status(200).json({message:"Menu item deleted successfully!!"})
      }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})
      }
})
module.exports=router
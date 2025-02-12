const express=require("express")
const router=express.Router()
const Person=require("../models/person.js");
const {generateToken,jwtAuthMiddleware}=require("../jwt.js")

router.get('/',async(req,res)=>{
    try{
       const data= await Person.find();
       res.status(200).json(data);
    }catch(error){
       console.log(error);
       res.status(500).json({error :'internal server error'})
    }
})

// profile route
router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user
        console.log("user data:",userData)
        const userId=userData.id
        const user=await Person.findById(userId)
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error :'internal server error'});
    }
})
router.get("/:workType",async(req,res)=>{
    try{
        let workType=req.params.workType
     if(workType=="chef"||workType=="waiter"||workType=="manager"){
        const response= await Person.find({work:workType})
        console.log("response fetched")
        res.status(200).json(response)
     }else {
        res.status(404).json({error:"Invalid work type"})
     }
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    } 
})

router.post('/signup', async(req,res)=>{
    try{
        const data=req.body;
        const newPerson= new Person(data);
    
        const response=await newPerson.save();
        console.log("Data fetched");
        const payload={
              username:response.username,
              id:response.id
        }
        const token=generateToken(payload)
        console.log("SAVED DATA",response)
        console.log("The token is is:",token)
        res.status(200).json({response:response,token:token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error :'internal server error'})
    }

})
//login route
router.post("/login",async(req,res)=>{
    try{
       //Extract username and password from request body
       const {username ,password}=req.body

       //find user by username
       const user=await Person.findOne({username:username})
  
       //if user does not exist or password does not macthed then return error
       if(!user || !(await(user.comparePassword(password)))){
           return send.status(404).json({error:"Invalid username or password"})
       }
  
       //generate token
       const payload={
          username:user.username,
          id:user.id
       }
       const token=generateToken(payload)
       res.json({token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({error :'internal server error'})
    }
   
})
router.put("/:id",async(req,res)=>{
     try{
         const personId=req.params.id //Extract id from url parameter
         const updatedPersonData=req.body //updated data for the person
         const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, //return the updated document
            runValidators:true //run mongoose validation
         })

         if(!response){
            console.log("user not found")
            return res.status(404).json({error:"user not found"})
         }
         res.status(200).json(response)
         console.log("Data updated")
     }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
     }
})

router.delete("/:id",async(req,res)=>{
      try{
          const personId=req.params.id  //Extract id from url parameter
          const response= await Person.findByIdAndDelete(personId)
          if(!response){
             console.log("Person not found")
             return res.status(404).json({error:"person not found"})
          }
          console.log("Data deleted")
          res.status(200).json({message:"Data of person deleted successfully!!"})
      }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
      }
})
module.exports= router

const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
//create peraon schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
personSchema.pre("save",async function(next){
    const person=this
    //Hash the password only if it has been modified(or is new)
    if(!person.isModified("password")) return next()
   try{
     // hash password generation 
     //first we generate salt
      const salt= await bcrypt.genSalt(10)

     //now completed hashed password 
     const hashedPassword= await bcrypt.hash(person.password,salt)

     //override the plain password with hashed one
     person.password=hashedPassword
     console.log("password updated")
     next()
   }catch(err){
       return next(err)
   }
})

personSchema.methods.comparePassword= async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(err){
        throw err
    }
}

//create peraon model
const Person= mongoose.model("Person",personSchema);
module.exports=Person
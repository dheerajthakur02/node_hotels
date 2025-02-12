const passport=require("passport")
const localStrategy=require("passport-local").Strategy
const Person=require("./models/person.js")

passport.use(new localStrategy(async(USERNAME,PASSWORD,done)=>{
  // authentication logic
    try{
        console.log("Recieved credentials:",USERNAME, PASSWORD)
        const user=await Person.findOne({username:USERNAME})
        if(!user)
          return done(null,false,{message:"Incorrect username"})
       const isPasswordMatch= await user.comparePassword(PASSWORD)
       if(isPasswordMatch){
         return done(null,user)
       }else{
        return done(null,false,{message:"Incorrect password"})
       }
    }catch(err){
       return done(err)
    }
}))

module.exports=passport
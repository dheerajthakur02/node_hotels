const jwt=require("jsonwebtoken")

const jwtAuthMiddleware=(req,res,next)=>{

    //first check request headers has authorization or not
   const authorization=req.headers.authorization
   if(!authorization) 
     return res.status(401).json({error:"Token not found"})
    //Extract the jwt toekn from the request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"})
    try{
      // verify jwt token 
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
       req.user=decoded
       next()
     }catch(err){
        console.log(err)
        res.status(401).json({error:"internal server error"})
     }
}
//function to generate the token 
const generateToken=(userData)=>{
    //Generate new token using user data
     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000})
}
module.exports={
    jwtAuthMiddleware,
    generateToken
}
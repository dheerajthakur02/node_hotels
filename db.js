const mongoose=require("mongoose");
require("dotenv").config()

//Define mongodb connection URL
const mongoURL=process.env.MONGODB_URL
// const mongoURL=process.env.MONGODB_URL_LOCAL

// depricted this thing
// set up mongoDB connection
// mongoose.connect(mongoURL,{
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// })

mongoose.connect(mongoURL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const db=mongoose.connection;

db.on("connected",()=>{
    console.log("Connected to mongodb server")
})

module.exports=db;
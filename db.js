const mongoose=require("mongoose");

//Define mongodb connection URL
const mongoURL="mongodb://localhost:27017/hotels"

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
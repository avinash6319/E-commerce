const mongoose = require("mongoose")
const connectDatabase =()=>{

  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true })
  
  .then(() => console.log("MongoDB is connected"))
  
}

module.exports=connectDatabase

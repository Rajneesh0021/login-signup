const mongoose = require('mongoose');
// Connect to MongoDB
const connection= mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
      console.log("successfully connected")
  }).catch(err=>console.log(err));
  

  module.exports=connection
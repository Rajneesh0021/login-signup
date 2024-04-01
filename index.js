const express = require('express');
require('dotenv').config()
const cors= require("cors");

const authRoutes = require('./api/routes/authRoutes');

const connection = require('./api/db/db');
const app = express();
app.use(cors())

// Middleware
app.use(express.json());


app.get('/',(req,res)=>{

  res.sendFile(__dirname + '/api/static/index.html');
})
// Routes


app.use('/auth', authRoutes);



// Error handling middleware


app.listen(process.env.PORT || 3000, async () => {
  await connection
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

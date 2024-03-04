require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connection successful");
  }).catch((err) => console.error("Connection failed", err));
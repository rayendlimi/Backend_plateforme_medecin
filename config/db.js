require('dotenv').config();
const mongoose =require('mongoose');

mongoose.connect(process.env.DATABASEURL)
.then(()=>{console.log("connect to database");})
.catch(()=>{console.log("erreur to connected")})

module.exports =mongoose;

const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://rayendlimi0107:Fuy0EvvNgEvSbglg@secondapi.7gpnt.mongodb.net/website?retryWrites=true&w=majority&appName=secondapi")
.then(()=>{console.log("connect to database");})
.catch(()=>{console.log("erreur to connected")})

module.exports =mongoose;

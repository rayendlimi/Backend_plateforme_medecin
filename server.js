const express =require('express')
const data =require('./config/db')
const app =express();
const cors= require('cors');
app.use(express.json());
app.use(cors());
const registermedecin =require("./src/routes/authmedecin")
const registerpatient =require("./src/routes/authpatient")

app.listen(3000, ()=>{ console.log("server is work")});

app.use('/getimage', express.static('../uploads'));
app.use('/registermedecin', registermedecin);

module.exports= data;


// Fuy0EvvNgEvSbglg

// mongodb+srv://rayendlimi0107:Fuy0EvvNgEvSbglg@secondapi.7gpnt.mongodb.net/?retryWrites=true&w=majority&appName=secondapi

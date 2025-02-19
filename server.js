const express =require('express')
const data =require('./config/db')
const app =express();
const cors= require('cors');
app.use(express.json());
app.use(cors());

const authsecretaire= require("./src/routes/authsecretaire")

const authmedecin =require("./src/routes/authmedecin")
const authpatient =require("./src/routes/authpatient");
const authadmin = require("./src/routes/authadmin");
const login= require('./src/routes/login');
const logout = require('./src/routes/logout');
require('dotenv').config();

app.listen(3000, ()=>{ console.log("server is work")});

app.use('/getimage', express.static('./uploads'));
app.use('/authmedecin', authmedecin);
app.use('/authsecretaire',authsecretaire );
app.use('/authpatient', authpatient);
app.use('/authAdmin', authadmin);
app.use('/loginuser', login);
app.use('/logoutuser', logout);
module.exports= data;


// Fuy0EvvNgEvSbglg

// mongodb+srv://rayendlimi0107:Fuy0EvvNgEvSbglg@secondapi.7gpnt.mongodb.net/?retryWrites=true&w=majority&
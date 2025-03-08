const express =require('express')
const data =require('./config/db')
const app =express();
const cors= require('cors');
app.use(express.json());
app.use(cors());

const authsecretaire= require("./src/routes/authentificationRoute/authsecretaire");
const authmedecin =require("./src/routes/authentificationRoute/authmedecin");
const authpatient =require("./src/routes/authentificationRoute/authpatient");
const authadmin = require("./src/routes/authentificationRoute/authadmin");
const login= require('./src/routes/authentificationRoute/login');
const logout = require('./src/routes/authentificationRoute/logout');
const update = require('./src/routes/authentificationRoute/updateprofil');
const rendezvous = require('./src/routes/gestion-rendezvous/route-rendezvous')
const consultation = require('./src/routes/gestion-consultations/route-consultation')
require('dotenv').config();

app.listen(3000, ()=>{ console.log("server is work")});

app.use('/getimage', express.static('./uploads'));
app.use('/authmedecin', authmedecin);
app.use('/authsecretaire',authsecretaire );
app.use('/authpatient', authpatient);
app.use('/authAdmin', authadmin);
app.use('/loginuser', login);
app.use('/logoutuser', logout);
app.use('/update',update );
app.use('/rendezvous',rendezvous );
app.use('/consultation',consultation )


module.exports= data;


// Fuy0EvvNgEvSbglg

// mongodb+srv://rayendlimi0107:Fuy0EvvNgEvSbglg@secondapi.7gpnt.mongodb.net/?retryWrites=true&w=majority&

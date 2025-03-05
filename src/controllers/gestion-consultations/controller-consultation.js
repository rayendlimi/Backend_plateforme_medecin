const consultation = require("../../models/consultation")

const createconsultation= async (req, res )=> {
    try {
const data=req.body
while (req.user.role==="medecin"){
const newconsultation = new consultation(data)
newconsultation.medecin=req.user.userId;}
await newconsultation.save();
res.status(201).send({ message: "Consultation created successfully", consultation: newconsultation });
}
catch {
    res.status(500).send({ error: error.message });
}

}


module.exports= {createconsultation}
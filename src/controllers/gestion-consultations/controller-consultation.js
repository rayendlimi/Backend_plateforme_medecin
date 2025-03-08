const consultation = require("../../models/consultation")

const createconsultation= async (req, res )=> {
    try {
const data=req.body
if (req.user.role==="medecin"){
const newconsultation = new consultation(data)
newconsultation.medecin=req.user.userId;
await newconsultation.save();

res.status(201).send({ message: "Consultation created successfully", consultation: newconsultation });

}
}
catch (err) {
    res.status(500).send({ message: err.message });
  }

}

const getAllConsultations = async (req, res) => {
    try {
        // Fetch all consultations
        const consultations = await consultation.find({medecin : req.user.userId})
console.log(consultations)
        res.status(200).send({ consultations });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const getconsultationsbypatient = async (req, res) => {
    try {
       const  cin= req.params.cin_patient;
        // Fetch all consultations
        const consultations = await consultation.find({cin_patient : cin})
console.log(consultations)
        res.status(200).send({ consultations });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateconsultation= async (req, res) => {
const data =req.body;
const ID =req.params.id;
     try {
      
         const updatedconsultation = await consultation.findByIdAndUpdate(ID, data,{ new: true });
         if (!updatedconsultation ) return res.status(404).json({ message: 'Consultation not found' });
         
         res.status(200).json(updatedconsultation);
     } catch (error) {
         res.status(400).json({ error: error.message });
     }

 
}


module.exports= {createconsultation,getAllConsultations,
    getconsultationsbypatient,updateconsultation}
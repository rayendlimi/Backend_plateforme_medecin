
const medecin = require("../../models/medecin");
const patients = require("../../models/patients");
const Rendezvous = require("../../models/rendezvous");
const secretaire = require("../../models/secretaire");


// Create a new rendezvous
const createRendezvous = async (req, res) => {
    try {
       const data=req.body;
        const newRendezvous = new Rendezvous(data);
          if (req.user.role==="medecin"){
            newRendezvous.medecin =req.user.userId

        }
        else if (req.user.role==="secretaire"){
            const sec = await secretaire.findOne({_id:req.user.userId});
            const med = await medecin.findOne({cin_medecin: sec.cin_medecin})
         
            newRendezvous.medecin= med._id;        
        }
        else if (req.user.role==='patient'){
            const testdate=await Rendezvous.findOne({date_rendez_vous: data.date_rendez_vous})
            if(testdate){
                return res.status(201).json({message:"ce date est reserver pour un rendezvous, merci de choisir changer le date de rendez-vous"} );
        }
            const pat = await patients.findOne({_id:req.user.userId});
            newRendezvous.cin_patient=pat.cin_patient;
            newRendezvous.telephone=pat.telephone;
            newRendezvous.email=pat.email;
            newRendezvous.nom_patient=pat.nom_patient;
            newRendezvous.prenom_patient=pat.prenom_patient;
           
         
        }
        await newRendezvous.save();
        res.status(201).json(newRendezvous);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all rendezvous
const getAllRendezvous = async (req, res) => {
    try {
        const rendezvousList = await Rendezvous.find();
        res.status(200).json(rendezvousList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getrendezvousbyspecialite= async (req, res) =>{
try{
    const specialites = req.params.specialite; 

const rendezvous= await Rendezvous.find({specialite: specialites})
if (rendezvous.length===0){
    return res.status(404).send("Aucun rendez-vous trouvé avec medecin de cette specialité");
}
res.status(200).send(rendezvous);
} catch (error) {
    res.status(500).send("Erreur lors de la recherche des rendez-vous");
}
}
const getrendezvousbydate= async (req, res) =>{
    try{
        const date = req.params.date; 
    
    const rendezvous= await Rendezvous.find({date_rendez_vous: date})
    if (rendezvous.length===0){
        return res.status(404).send("Aucun rendez-vous trouvé a ce date ");
    }
    res.status(200).send(rendezvous);
    } catch (error) {
        res.status(500).send("Erreur lors de la recherche des rendez-vous");
    }
    }


// Get a single rendezvous by ID
const getRendezvousById = async (req, res) => {
    try {
        const rendezvous = await Rendezvous.findById(req.params.id);
        if (!rendezvous) return res.status(404).json({ message: 'Rendezvous not found' });
        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an rendezvous 
const updateRendezvous = async (req, res) => {
    try {
        const updatedRendezvous = await Rendezvous.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRendezvous) return res.status(404).json({ message: 'Rendezvous not found' });
        res.status(200).json(updatedRendezvous);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an rendezvous 
const deleteRendezvous = async (req, res) => {
    try {
        const deletedRendezvous = await Rendezvous.findByIdAndDelete(req.params.id);
        if (!deletedRendezvous) return res.status(404).json({ message: 'Rendezvous not found' });
        res.status(200).json({ message: 'Rendezvous deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { deleteRendezvous,
    updateRendezvous,
    getRendezvousById,
    getAllRendezvous,
    createRendezvous,
    getrendezvousbyspecialite,
    getrendezvousbydate}

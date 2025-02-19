const secretaire = require("../models/secretaire");
const bcrypt = require("bcrypt");
const medecin = require("../models/medecin");

const register = async (req, res) => {
  try {
    const data = req.body;
    console.log("Req user:", req.user.userId); // Vérifier si req.user est bien rempli

    const id_medecin = req.user.userId;
    const authmed = await medecin.findOne({_id: id_medecin });
    console.log(authmed)

const existingSecretaire = await secretaire.findOne({ cin_medecin: authmed.cin_medecin });
    if (existingSecretaire) {
      return res.status(400).json({ message: "Tu as déjà un compte pour ta secrétaire" });
    }
 else if(await secretaire.findOne({cin_secretaire: data.cin_secretaire})){
    return res.json({message : "secretaire déja travaillé avec un medecin"})}

   
    

    const newSecretaire = new secretaire(data);
    newSecretaire.cin_medecin = authmed.cin_medecin;
    authmed.cin_secretaire= data.cin_secretaire;
    authmed.save();

    const salt = bcrypt.genSaltSync(10);
    newSecretaire.password = bcrypt.hashSync(data.password, salt);

    await newSecretaire.save();
    await authmed.save();
    res.status(200).send(newSecretaire);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Export des contrôleurs
module.exports = {
  register,
};

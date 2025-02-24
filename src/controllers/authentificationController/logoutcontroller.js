const Medecin = require("../../models/medecin");
const Secretaire = require("../../models/secretaire");
const Patient = require("../../models/patients");
const admin = require("../../models/admin");

// Logout function
const logout = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    let user;

    // Verify the user based on their role
    if (req.user.role === "medecin") {
      user = await Medecin.findById(userId);
    } else if (req.user.role === "secretaire") {
      user = await Secretaire.findById(userId);
    } else if (req.user.role === "patient") {
      user = await Patient.findById(userId);
    } else if (req.user.role === "admin") {
      user = await admin.findById(userId);
    } else {
      return res.status(400).send({ message: "User role not recognized" });
    }

    // Remove the refresh token from the user
    
    user.refreshToken = null;
    await user.save();

    res.status(200).send("Logged out successfully.");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  logout
};

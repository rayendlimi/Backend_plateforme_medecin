const jwt = require("jsonwebtoken");
const Medecin = require("../../models/medecin");
const Secretaire = require("../../models/secretaire");
const Patient = require("../../models/patient");

const generateTokens = (user, role) => {
  const accessToken = jwt.sign(
    { userId: user._id, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Short-lived access token
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Long-lived refresh token
  );

  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user;
  let role;

  // Check in Medecin collection
  user = await Medecin.findOne({ email });
  if (user) {
    role = "medecin";
  } else {
    // Check in Secretaire collection
    user = await Secretaire.findOne({ email });
    if (user) {
      role = "secretaire";
    } else {
      // Check in Patient collection
      user = await Patient.findOne({ email });
      if (user) {
        role = "patient";
      } else {
        return res.status(401).send("Invalid credentials");
      }
    }
  }

  // Verify password
  if (!(await user.comparePassword(password))) {
    return res.status(401).send("Invalid credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user, role);

  // Save the refresh token in the database (e.g., in the user's document)
  user.refreshToken = refreshToken;
  await user.save();

  // Send tokens to the client
  res.json({ accessToken, refreshToken, role }); // Optionally include the role in the response
};

module.exports = login;
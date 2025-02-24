const admin = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    try {
        const data = req.body;

        if (await admin.findOne({ username: data.username })) {
            return res.status(400).send({ message: "Username déjà existant" });
        }

        if (await admin.findOne({ email: data.email })) {
            return res.status(401).send({ message: "Email déjà existant" });
        }

        const newAdmin = new admin(data);
        const salt = bcrypt.genSaltSync(10);
        newAdmin.password = bcrypt.hashSync(data.password, salt);

        await newAdmin.save();
        res.status(200).send(newAdmin);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};



module.exports = registerAdmin;

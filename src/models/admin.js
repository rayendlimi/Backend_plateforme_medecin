const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id_admin: { type: String, required: true },

    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('admin', AdminSchema);

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendVerificationEmail = async (email, user, activationCode) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Stocké dans .env
                pass: process.env.EMAIL_PASS  // Stocké dans .env
            }
        });

        const verificationLink = `https://localhost:3000/${user}/verifmedecin/${activationCode}`;

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vérification de votre compte',
            text: `Bonjour,\n\nCliquez sur le lien suivant pour activer votre compte : ${verificationLink}\n\nMerci.`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: ' + info.response);
    } catch (error) {
        console.error("Erreur lors d'envoie de l'emails:", error);
    }
};

module.exports = sendVerificationEmail;


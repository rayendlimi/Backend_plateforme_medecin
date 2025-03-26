const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendVerificationEmail = async (email, activationCode) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const verificationLink = `http://localhost:5173/verif/${activationCode}`; // Sans http://

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vérification de votre compte',
            html: `
                <h2>Bonjour,</h2>
                <h3>Cliquez sur le lien suivant pour activer votre compte :</h3>
                <p>
                    <a href="${verificationLink}" target="_blank" 
                       style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                        Activer mon compte
                    </a>
                </p>
               
            `
        };
        

        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: ' + info.response);
    } catch (error) {
        console.error("Erreur lors d'envoie de l'emails:", error);
    }
};

module.exports = sendVerificationEmail;


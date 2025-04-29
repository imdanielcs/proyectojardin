require('dotenv').config();
const mailjet = require('node-mailjet');

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

async function sendMail(to, subject, html) {
  try {
    const result = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: 'de.reveco@duocuc.cl', Name: 'Jardín Huellita' },
            To: [{ Email: to }],
            Subject: subject,
            HTMLPart: html,
          },
        ],
      });
    return result.body;
  } catch (err) {
    console.error('Error al enviar el correo:', err.message);
    throw err;
  }
}

module.exports = { sendMail };

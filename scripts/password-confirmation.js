const { sendEmail } = require("../email");

const {
  mandataireProfilNotUpdateEmail,
  updateMandataireMailSent
} = require("../db/queries/email");

const EMAIL_RELANCE_TEXT = `
Bonjour,

Votre nouveau mot de passe a bien été enregistré.

Bien à vous.
`;

const EMAIL_RELANCE_HTML = url => `
Bonjour,<br>
<br>
Votre nouveau mot de passe a bien été enregistré.
<br><br><br>
Bien à vous.
`;

const confirmationPasswordEmail = mandataire => {
 console.log("manda",mandataire)
    sendEmail(
        mandataire.email,
        "Confirmation du mot de passe",
        EMAIL_RELANCE_TEXT,
        EMAIL_RELANCE_HTML
    ).catch(e => {
        // todo: sentry
        console.log(e);
    });
}

module.exports = {
  confirmationPasswordEmail
};

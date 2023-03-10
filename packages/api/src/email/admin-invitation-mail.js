const sentry = require("~/utils/sentry");
const logger = require("~/utils/logger");
const { sendEmail } = require(".");

const text = (url) =>
  `Madame, Monsieur,

  Vous êtes invité par à créer un compte administrateur sur e-mjpm.

  Veuillez cliquer sur le lien suivant: ${url}

  À bientôt

  L’équipe e-mjpm.`;

const html = (url) =>
  `Madame, Monsieur,
  <br><br>
    Vous êtes invité à créer un compte administrateur sur e-mjpm.
    <br><br>
    Veuillez cliquer sur le lien suivant <a href=${url}>Créer mon compte</a>.
  <br><br>
    À bientôt
  <br><br>
  L’équipe e-mjpm.`;

const adminInvitationMail = async (invitation) => {
  const url = `${process.env.APP_URL}/signup/invitation?type=admin&token=${invitation.token}`;

  try {
    await sendEmail(
      invitation.email,
      "Vous êtes invité à vous inscrire sur la plateforme e-mjpm",
      text(url),
      html(url)
    );
  } catch (error) {
    sentry.captureException(error);
    logger.error(error);
  }
};

module.exports = { adminInvitationMail };

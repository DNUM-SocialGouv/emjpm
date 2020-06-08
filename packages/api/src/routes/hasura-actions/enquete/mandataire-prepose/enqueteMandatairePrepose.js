const {
  getEnqueteReponseMandatairePrepose,
  createEmptyEnqueteReponse
} = require("./requests");
const enqueteMandatairePreposeStatus = require("./enqueteMandatairePreposeStatus");

async function initEnqueteMandatairePrepose({
  // eslint-disable-next-line no-unused-vars
  enqueteContext: { enqueteId, userId, service, mandataire }
}) {
  let enqueteReponse = await getEnqueteReponseMandatairePrepose({
    enqueteId,
    mandataireId: mandataire.id
  });

  if (!enqueteReponse) {
    const { insert_enquete_reponses_one } = await createEmptyEnqueteReponse({
      enqueteId,
      mandataireId: mandataire.id
    });

    enqueteReponse = insert_enquete_reponses_one;
  }
  const status = await enqueteMandatairePreposeStatus(enqueteReponse);
  const ids = {
    id: enqueteReponse.id,
    modalites_exercice_id:
      enqueteReponse.enquete_reponses_modalites_exercice_id,
    populations_id: enqueteReponse.enquete_reponses_populations_id,
    financement_id: enqueteReponse.enquete_reponses_financement_id,
    activite_id: enqueteReponse.enquete_reponses_activite_id
  };
  return {
    enquete_id: enqueteReponse.enquete_id,
    submitted_at: enqueteReponse.submitted_at,
    enquete_reponse_status: status,
    enquete_reponse_ids: ids
  };
}

module.exports = { initEnqueteMandatairePrepose };
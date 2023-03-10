const { Service } = require("~/models");
const { ServiceMember } = require("~/models");
const { Mandataire } = require("~/models");
const { User } = require("~/models");

const getEmailUserDatas = async (mandataire_id, service_id) => {
  if (mandataire_id) {
    const [mandataire] = await Mandataire.query()
      .modify("selectAll")
      .modify("selectMesuresEnAttente")
      .modify("selectMesuresEnCours")
      .where("id", mandataire_id);
    const [currentUser] = await User.query().where("id", mandataire.user_id);
    return [
      {
        dispo_max: mandataire.dispo_max,
        email: currentUser.email,
        mesures_en_cours: mandataire.mesures_en_cours,
      },
    ];
  } else {
    const service = await Service.query()
      .modify("selectAll")
      .modify("selectMesuresAwaiting")
      .modify("selectMesuresInProgress")
      .findById(service_id);
    const serviceAdmins = await ServiceMember.query().where(
      "service_id",
      service_id
    );
    const userIds = serviceAdmins.map((sa) => sa.user_id);
    const users = await User.query().findByIds(userIds);
    return users.map((user) => ({
      dispo_max: service.dispo_max,
      email: user.email,
      mesures_en_cours: service.mesures_in_progress,
    }));
  }
};

module.exports = {
  getEmailUserDatas,
};

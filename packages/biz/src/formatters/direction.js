const {
  isDirectionTypeDepartemental,
  isDirectionTypeNational,
  isDirectionTypeRegional,
} = require("../services");

const directionFormatter = {
  formatAdministrationInfo(direction) {
    if (isDirectionTypeNational(direction)) {
      return "DGCS";
    }
    if (isDirectionTypeRegional(direction)) {
      return `Direction régionale (${
        direction.region ? direction.region.nom : ""
      })`;
    }
    if (isDirectionTypeDepartemental(direction)) {
      return `Direction départementale (${
        direction.departement ? direction.departement.nom : ""
      })`;
    }
    return "-";
  },
};

module.exports = { directionFormatter };

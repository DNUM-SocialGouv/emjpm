const { normalizeNumeroRG } = require("~/utils/numero-rg");

module.exports = function dedupMesures(rows) {
  return Array.from(
    new Set(
      rows.map(({ numero_rg, tribunal_siret }) =>
        [normalizeNumeroRG(numero_rg), tribunal_siret].join(".")
      )
    )
  ).map((uniqHash) => {
    return rows.find(
      ({ numero_rg, tribunal_siret }) =>
        [normalizeNumeroRG(numero_rg), tribunal_siret].join(".") === uniqHash
    );
  });
};

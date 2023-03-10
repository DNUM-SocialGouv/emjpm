function isAdmin(user) {
  return user.type === "admin";
}

function isService(user) {
  return user.type === "service";
}

function isIndividuel(user) {
  return user.type === "individuel";
}

function isSdpf(user) {
  return user.type === "sdpf";
}
function isDpfi(user) {
  return user.type === "dpfi";
}

function isPrepose(user) {
  return user.type === "prepose";
}

function isMandataire(user) {
  return isPrepose(user) || isIndividuel(user);
}

function isDirection(user) {
  return user.type === "direction";
}

function isMagistrat(user) {
  return user.type === "ti";
}

function isGreffier(user) {
  return user.type === "greffier";
}

function isDirectionNationale(user) {
  return user.user_roles
    .map((ur) => ur.role.name)
    .includes("direction_nationale");
}

module.exports = {
  isAdmin,
  isDirection,
  isDirectionNationale,
  isDpfi,
  isGreffier,
  isIndividuel,
  isMagistrat,
  isMandataire,
  isPrepose,
  isSdpf,
  isService,
};

const { USER_ROLES } = require("./constants");

function isAdmin(role) {
  return role === USER_ROLES.ADMIN;
}

function isValidRole(role) {
  return Object.values(USER_ROLES).includes(role);
}

module.exports = { isAdmin, isValidRole };

const { isValidRole } = require("./roleValidation");
const { USER_ROLES } = require("./constants");

function validateRegistration(data) {
  if (!data.firstName || !data.email || !data.password) {
    return { valid: false, error: "Missing required fields" };
  }

  if (data.password.length < 8) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

  return { valid: true };
}

function validateLogin(data) {
  if (!data.email || !data.password) {
    return { valid: false, error: "Email and password required" };
  }

  return { valid: true };
}

function validateRolePromotion(data) {
  if (!data.userId || !data.newRole) {
    return { valid: false, error: "Missing userId or newRole" };
  }

  if (!isValidRole(data.newRole)) {
    return { valid: false, error: "Invalid role" };
  }

  if (data.newRole === USER_ROLES.ADMIN) {
    return { valid: false, error: "Cannot promote to admin" };
  }

  return { valid: true };
}

module.exports = { validateRegistration, validateLogin, validateRolePromotion };

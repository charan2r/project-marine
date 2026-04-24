const jwt = require("jsonwebtoken");
const { isAdmin } = require("../lib/roleValidation");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verify JWT token and extract user info
 */
function verifyToken(req, res, next) {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireAuth(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
}

function requireAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req.user || !isAdmin(req.user.role)) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  });
}

module.exports = { requireAdmin, requireAuth, verifyToken };

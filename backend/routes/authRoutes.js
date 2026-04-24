const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes (no auth required)
router.post("/register", (req, res) => authController.register(req, res));

router.post("/login", (req, res) => authController.login(req, res));

router.post("/forgot-password", (req, res) =>
  authController.forgotPassword(req, res),
);

router.post("/reset-password", (req, res) =>
  authController.resetPassword(req, res),
);

// Protected routes (auth required)
router.post("/logout", requireAuth, (req, res) =>
  authController.logout(req, res),
);

router.post("/refresh", (req, res) => authController.refreshToken(req, res));

module.exports = router;

const express = require("express");
const userController = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Middleware to protect all user routes
router.use(requireAuth);

// Get user profile by ID
router.get("/:id", (req, res) => userController.getUserProfile(req, res));

// Update user profile
router.put("/:id", (req, res) => userController.updateUserProfile(req, res));

// Delete user account
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

// Admin only: Get all users
router.get("/", requireAdmin, (req, res) =>
  userController.getAllUsers(req, res),
);

module.exports = router;

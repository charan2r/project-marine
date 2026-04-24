const userService = require("../services/userService");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

class UserController {
  /**
   * GET /api/v1/users/:id
   * Get user profile by ID
   */
  async getUserProfile(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserProfile(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Get user profile error:", error.message);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  }

  /**
   * PUT /api/v1/users/:id
   * Update user profile
   */
  async updateUserProfile(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Ensure user can only update their own profile (unless admin)
      if (req.user.id !== id && req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "You can only update your own profile" });
      }

      const user = await userService.updateUserProfile(id, updateData);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Update user profile error:", error.message);
      res.status(500).json({ error: "Failed to update profile" });
    }
  }

  /**
   * DELETE /api/v1/users/:id
   * Delete user account
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Ensure user can only delete their own account (unless admin)
      if (req.user.id !== id && req.user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "You can only delete your own account" });
      }

      const success = await userService.deleteUser(id);

      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error.message);
      res.status(500).json({ error: "Failed to delete account" });
    }
  }

  /**
   * GET /api/v1/users
   * List all users (admin only)
   */
  async getAllUsers(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;

      const users = await userService.getAllUsers(limit, offset);

      res.json({
        success: true,
        users,
        pagination: {
          limit,
          offset,
          count: users.length,
        },
      });
    } catch (error) {
      console.error("Get all users error:", error.message);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}

module.exports = new UserController();

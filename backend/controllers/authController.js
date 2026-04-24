const authService = require("../services/authService");
const userService = require("../services/userService");
const { validateRegistration, validateLogin } = require("../lib/validators");

class AuthController {
  /**
   * POST /api/v1/auth/register
   * Register a new user
   */
  async register(req, res) {
    try {
      const { firstName, lastName, email, password, profession } = req.body;

      // Validate input
      const validation = validateRegistration({ firstName, email, password });
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }

      // Register user
      const user = await authService.register({
        firstName,
        lastName,
        email,
        password,
        profession,
      });

      // Remove password hash from response
      const { passwordHash, ...safeUser } = user;

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: safeUser,
      });
    } catch (error) {
      console.error("Register error:", error.message);

      if (error.message.includes("already registered")) {
        return res.status(409).json({ error: "Email already registered" });
      }

      res.status(500).json({ error: "Registration failed" });
    }
  }

  /**
   * POST /api/v1/auth/login
   * User login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      const validation = validateLogin({ email, password });
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }

      // Login user
      const { user, accessToken, refreshToken } = await authService.login(
        email,
        password,
      );

      // Remove password hash from response
      const { passwordHash, ...safeUser } = user;

      // Set refresh token in httpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        success: true,
        message: "Login successful",
        user: safeUser,
        token: accessToken,
      });
    } catch (error) {
      console.error("Login error:", error.message);

      if (error.message.includes("Invalid email or password")) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.status(500).json({ error: "Login failed" });
    }
  }

  /**
   * POST /api/v1/auth/logout
   * User logout
   */
  async logout(req, res) {
    try {
      // Clear refresh token cookie
      res.clearCookie("refreshToken");

      res.json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ error: "Logout failed" });
    }
  }

  /**
   * POST /api/v1/auth/refresh
   * Refresh JWT token
   */
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token required" });
      }

      const { accessToken } = await authService.refreshToken(refreshToken);

      res.json({
        success: true,
        message: "Token refreshed",
        token: accessToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error.message);
      res.status(401).json({ error: "Invalid refresh token" });
    }
  }

  /**
   * POST /api/v1/auth/forgot-password
   * Request password reset
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email required" });
      }

      const result = await authService.requestPasswordReset(email);

      // Return generic response for security
      res.json({
        success: true,
        message: "If email exists, reset link has been sent",
      });
    } catch (error) {
      console.error("Forgot password error:", error.message);
      res.status(500).json({ error: "Failed to process request" });
    }
  }

  /**
   * POST /api/v1/auth/reset-password
   * Reset password with token
   */
  async resetPassword(req, res) {
    try {
      const { resetToken, newPassword } = req.body;

      if (!resetToken || !newPassword) {
        return res
          .status(400)
          .json({ error: "Reset token and new password required" });
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }

      const result = await authService.resetPassword(resetToken, newPassword);

      res.json(result);
    } catch (error) {
      console.error("Reset password error:", error.message);

      if (
        error.message.includes("Invalid") ||
        error.message.includes("expired")
      ) {
        return res
          .status(401)
          .json({ error: "Invalid or expired reset token" });
      }

      res.status(500).json({ error: "Failed to reset password" });
    }
  }
}

module.exports = new AuthController();

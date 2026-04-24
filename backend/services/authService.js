const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../db/drizzle.js");
const { users } = require("../db/schema/users.js");
const { eq } = require("drizzle-orm");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRY = "24h";
const REFRESH_TOKEN_EXPIRY = "7d";

class AuthService {
  // Register a new user
  async register(userData) {
    const { firstName, lastName, email, password, profession } = userData;

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        firstName,
        lastName: lastName || null,
        email,
        passwordHash: hashedPassword,
        profession: profession || null,
        role: "user",
      })
      .returning();

    return newUser[0];
  }

  //Login user
  async login(email, password) {
    // Find user by email
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userList.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = userList[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY },
    );

    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    return { user, accessToken, refreshToken };
  }

  //Refresh access token
  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, decoded.id))
        .limit(1);

      if (user.length === 0) {
        throw new Error("User not found");
      }

      const newAccessToken = jwt.sign(
        { id: user[0].id, email: user[0].email, role: user[0].role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  //Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  //Request password reset (generate reset token)
  async requestPasswordReset(email) {
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userList.length === 0) {
      return { success: true, message: "If email exists, reset link sent" };
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      { id: userList[0].id, type: "reset" },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    // TODO: Send email with reset link containing resetToken
    // Example: sendResetEmail(email, resetToken)

    return { success: true, message: "Reset link sent to email", resetToken };
  }

  //Reset password with token
  async resetPassword(resetToken, newPassword) {
    try {
      const decoded = jwt.verify(resetToken, JWT_SECRET);

      if (decoded.type !== "reset") {
        throw new Error("Invalid reset token");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db
        .update(users)
        .set({ passwordHash: hashedPassword })
        .where(eq(users.id, decoded.id));

      return { success: true, message: "Password reset successfully" };
    } catch (error) {
      throw new Error("Invalid or expired reset token");
    }
  }
}

module.exports = new AuthService();

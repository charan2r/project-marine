const { db } = require("../db/drizzle");
const { users } = require("../db/schema/users");
const { eq } = require("drizzle-orm");

class UserService {
  //Get user profile by ID
  async getUserProfile(userId) {
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userList.length === 0) {
      return null;
    }

    const user = userList[0];

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  //Update user profile
  async updateUserProfile(userId, updateData) {
    const {
      firstName,
      lastName,
      bio,
      profession,
      contactNumber,
      interests,
      profileImageUrl,
      preferences,
    } = updateData;

    // Only allow updates to specific fields
    const updateFields = {};

    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (bio !== undefined) updateFields.bio = bio;
    if (profession !== undefined) updateFields.profession = profession;
    if (contactNumber !== undefined) updateFields.contactNumber = contactNumber;
    if (interests !== undefined) updateFields.interests = interests;
    if (profileImageUrl !== undefined)
      updateFields.profileImageUrl = profileImageUrl;
    if (preferences !== undefined) updateFields.preferences = preferences;

    updateFields.updatedAt = new Date();

    const updatedUser = await db
      .update(users)
      .set(updateFields)
      .where(eq(users.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return null;
    }

    const user = updatedUser[0];
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Delete user account
   */
  async deleteUser(userId) {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    return deletedUser.length > 0;
  }

  //Get all users (admin only)
  async getAllUsers(limit = 50, offset = 0) {
    const userList = await db.select().from(users).limit(limit).offset(offset);

    return userList.map((user) => {
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    });
  }
}

module.exports = new UserService();

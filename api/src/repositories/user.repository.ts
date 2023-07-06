import { db } from "../db/dbConnection";
import { USER_TABLE_NAME } from "../db/table_names";
import logger from "../middleware/logger";
import { CreateUser, User, UserTable } from "../types/user";

export class UserRepository {
  async createUser(userData: CreateUser) {
    const [user] = await db<UserTable>(USER_TABLE_NAME)
      .insert({
        credential_id: userData.credentialId,
        first_name: userData.firstName,
        last_name: userData.lastName,
      })
      .returning("*");

    logger.info({ id: user.id }, "User repository createUser");

    return this.mapDbUser(user);
  }

  private mapDbUser(dbUser: UserTable): User {
    return {
      id: dbUser.id,
      credentialId: dbUser.credential_id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at,
    };
  }
}

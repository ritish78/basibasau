import { user } from "src/models/user";
import db from ".";
import { eq, sql } from "drizzle-orm";

/**
 * @param firstName string - firstName of user
 * @param lastName  string - lastName of user
 * @param email     string - email of user
 * @param password  string - hashed password to login
 * @returns         string - Promise to add new user to the database
 */
export const preparedRegisterUser = db
  .insert(user)
  .values({
    firstName: sql.placeholder("firstName"),
    lastName: sql.placeholder("lastName"),
    email: sql.placeholder("email"),
    password: sql.placeholder("password"),
  })
  .prepare("register-user");

/**
 * @param email     string - email of user
 * @returns         Array - Promise to fetch user by email
 */
export const preparedFetchUserByEmail = db
  .select()
  .from(user)
  .where(eq(user.email, sql.placeholder("email")))
  .prepare("fetch-user-by-email");

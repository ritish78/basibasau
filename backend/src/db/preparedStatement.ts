import { user } from "src/models/user";
import db from ".";
import { and, eq, sql } from "drizzle-orm";
import { property } from "src/models/property";
import { favourites } from "src/models/favourites";

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
  .returning()
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

/**
 * @returns       Array - List of properties
 */
export const preparedGetListOfProperties = db.select().from(property).prepare("fetch-properties");

/**
 * @param propertyId    string - uuid of the property
 * @returns             property by its id
 */
export const preparedGetPropertyByItsId = db
  .select()
  .from(property)
  .where(eq(property.id, sql.placeholder("propertyId")))
  .prepare("get-property-by-its-id");

/**
 * @param propertyId    string - uuid of the property
 * @param userId        string - uuid of the user
 * @returns             Array - property that the user has liked
 */
export const preparedUserHasLikedProperty = db
  .select()
  .from(favourites)
  .where(
    and(
      eq(favourites.propertyId, sql.placeholder("propertyId")),
      eq(favourites.userId, sql.placeholder("userId")),
    ),
  )
  .prepare("user-has-liked-property");

/**
 * @param propertyId    string - uuid of the property
 * @param userId        string - uuid of the user
 * @returns             string - Promise to add userId and propertyId to favourites table
 */
export const preparedAddLikeToProperty = db
  .insert(favourites)
  .values({ userId: sql.placeholder("userId"), propertyId: sql.placeholder("propertyId") })
  .prepare("add-liked-property");

/**
 * @param propertyId    string - uuid of the property
 * @returns             string - Promise to increase like of the property by 1
 */
export const preparedIncreaseLikeOfProperty = db
  .update(property)
  .set({ likes: sql`${property.likes} + 1` })
  .where(eq(property.id, sql.placeholder("propertyId")))
  .prepare("increase-property-like");

/**
 * @param propertyId    string - uuid of the property
 * @param userId        string - uuid of the user
 * @returns             string - Promise to delete userId and propertyId from favourites table
 */
export const preparedRemoveLikeFromProperty = db
  .delete(favourites)
  .where(
    and(
      eq(favourites.propertyId, sql.placeholder("propertyId")),
      eq(favourites.userId, sql.placeholder("userId")),
    ),
  )
  .prepare("user-has-disliked-property");

/**
 * @param propertyId    string - uuid of the property
 * @returns             string - Promise to decrease like of the property by 1
 */
export const preparedDecreaseLikeOfProperty = db
  .update(property)
  .set({ likes: sql`${property.likes} - 1` })
  .where(eq(property.id, sql.placeholder("propertyId")))
  .prepare("decrease-property-like");

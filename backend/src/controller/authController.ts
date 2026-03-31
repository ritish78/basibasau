import { preparedFetchUserByEmail, preparedRegisterUser } from "src/db/preparedStatement";
import { AppError, AuthError, NotFoundError } from "src/utils/error";
import hashPassword, { passwordMatches } from "src/utils/hashPassword";

export const getUserByEmail = async (email: string) => {
  const [userFromDatabase] = await preparedFetchUserByEmail.execute({ email: email.trim() });

  return userFromDatabase;
};

/**
 * @param firstName string - firstName of user
 * @param lastName  string - lastName of user
 * @param email     string - email of user
 * @param password  string - plain text password
 * @returns         void | AppError
 */
export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const userFromDatabase = await getUserByEmail(email);

  if (userFromDatabase) {
    throw new AppError("Register Error", 409, "User already exists! Login instead!");
  }

  const hashedPassword = await hashPassword(password);

  const [registeredUser] = await preparedRegisterUser.execute({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return registeredUser;
};

/**
 * @param email         string - email of user
 * @param password      string - plain password to login
 * @returns             user from db | Error (NotFoundError or AuthError)
 */
export const loginUser = async (email: string, password: string) => {
  const userFromDatabase = await getUserByEmail(email);

  if (!userFromDatabase) {
    throw new NotFoundError("User does not exists! Register instead!");
  }

  const isPasswordSame = await passwordMatches(password, userFromDatabase.password);

  if (!isPasswordSame) {
    throw new AuthError("Invalid Credentials!");
  }

  return userFromDatabase;
};

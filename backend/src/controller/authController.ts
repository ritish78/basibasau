import { preparedFetchUserByEmail, preparedRegisterUser } from "src/db/preparedStatement";
import { AppError } from "src/utils/error";
import hashPassword from "src/utils/hashPassword";

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  const [userFromDatabase] = await preparedFetchUserByEmail.execute({ email: email.trim() });

  if (userFromDatabase) {
    throw new AppError("Register Error", 409, "User already exists! Login instead!");
  }

  const hashedPassword = await hashPassword(password);

  await preparedRegisterUser.execute({ firstName, lastName, email, password: hashedPassword });
};

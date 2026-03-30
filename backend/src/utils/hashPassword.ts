import argon2 from "argon2";

/**
 * @param plainPassword     string - plain password to hash
 * @returns                 string - Hashed password
 */
const hashPassword = async (plainPassword: string) => {
  //No need to use salt rounds in argon2
  const hashedPassword = await argon2.hash(plainPassword);

  return hashedPassword;
};

/**
 * @param plainPassword     string - plain password from user input
 * @param hashedPassword    string - hashed password from db
 * @returns                 boolean - true if password provided by user matches password from db
 */
export const passwordMatches = async (plainPassword: string, hashedPassword: string) => {
  const isPasswordSame = await argon2.verify(hashedPassword, plainPassword);

  return isPasswordSame;
};

export default hashPassword;

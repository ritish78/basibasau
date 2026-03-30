import argon2 from "argon2";

const hashPassword = async (plainPassword: string) => {
  //No need to use salt rounds in argon2
  const hashedPassword = await argon2.hash(plainPassword);

  return hashedPassword;
};

export default hashPassword;

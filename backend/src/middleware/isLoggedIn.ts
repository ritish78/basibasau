import { Request, Response, NextFunction } from "express";
import { AuthError } from "src/utils/error";

/**
 * @param req     Request object from express
 * @param res     Response object from express
 * @param next    Next middleware function from express
 * @returns       sends request to another middleware in Error or normal
 */
const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return next(new AuthError("Log in to continue!"));
  }

  next();
};

export default isLoggedIn;

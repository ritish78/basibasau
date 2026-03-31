import { NextFunction, Router, Request, Response } from "express";
import { getUserByEmail, loginUser, registerUser } from "src/controller/authController";
import isLoggedIn from "src/middleware/isLoggedIn";
import { AppError, NotFoundError } from "src/utils/error";

const router = Router();

/**
 * @route               /api/v1/auth/register
 * @method              POST
 * @desc                Register new user
 * @access              Public
 * @param firstName     string - firstName of user
 * @param lastName      string - lastName of user
 * @param email         string - email of user
 * @param password      string - plain password to login
 * @returns             HTTP response
 */
router.route("/register").post(async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);

    const newUser = await registerUser(firstName, lastName, email, password);

    req.session.userId = newUser.id;
    req.session.email = newUser.email;
    req.session.save();

    return res.status(201).send({ message: "Registered Successfully!" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message });
    }

    return res.status(500).send({ message: "Error occurred while registering user!" });
  }
});

/**
 * @route               /api/v1/auth/login
 * @method              POST
 * @desc                Login existing user
 * @access              Public
 * @param email         string - email of user
 * @param password      string - plain password to login
 * @returns             HTTP response
 */
router.route("/login").post(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userFromDatabase = await loginUser(email, password);

    req.session.userId = userFromDatabase.id;
    req.session.email = userFromDatabase.email;
    req.session.save();

    return res.status(200).send({
      message: "Login Successful!",
      user: {
        id: userFromDatabase.id,
        firstName: userFromDatabase.firstName,
        lastName: userFromDatabase.lastName,
        email: userFromDatabase.email,
        createdAt: userFromDatabase.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message });
    }

    return res.status(500).send({ message: "Error occurred while logging in user!" });
  }
});

/**
 * @route       /api/v1/auth/logout
 * @method      POST
 * @desc        Logout the current user
 * @access      Auth User
 */
router.route("/logout").post(isLoggedIn, async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({ message: "Could not logout user!" });
    } else {
      res.clearCookie("connect.sid");
      return res.status(200).send({ message: "Logged out successfully!" });
    }
  });
});

router.route("/me").get(isLoggedIn, async (req: Request, res: Response) => {
  //Only making IDE happy. isLoggedIn middleware should handle it.
  if (!req.session.email) {
    return res.status(400).send({ message: "Login to continue!" });
  }

  const userBySessionEmail = await getUserByEmail(req.session.email);

  return res.status(200).send({
    user: {
      firstName: userBySessionEmail.firstName,
      lastName: userBySessionEmail.lastName,
      email: userBySessionEmail.email,
    },
  });
});

export default router;

import { NextFunction, Router, Request, Response } from "express";
import { registerUser } from "src/controller/authController";

const router = Router();

router.route("/register").post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);

    await registerUser(firstName, lastName, email, password);

    return res.status(201).send({ message: "Registered Successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

export default router;

import { Router, Request, Response } from "express";
import { dummyPropertyData } from "seed";
import { getListOfProperties, seedProperty } from "src/controller/propertyController";
import isLoggedIn from "src/middleware/isLoggedIn";

const router = Router();

/**
 * @route       /api/v1/property/seed-property
 * @method      POST
 * @desc        Seed dummy property into postgresql db
 * @access      Auth User
 */
router.route("/seed-property").post(isLoggedIn, async (req: Request, res: Response) => {
  try {
    await seedProperty(dummyPropertyData);
    console.log(dummyPropertyData);
    res.status(201).send({ message: "Property info seeded successfully!" });
  } catch (error) {
    console.log("Error while seeding the property to database!");
    res.status(500).send({ message: "Could not seed property info to database!" });
  }
});

/**
 * @route       /api/v1/property
 * @method      GET
 * @desc        Get list of properties
 * @access      Public
 */
router.route("/").get(async (req: Request, res: Response) => {
  try {
    //Need to implement pagination but ours is a small app for testing
    const listOfProperties = await getListOfProperties();

    res.status(200).send({ properties: listOfProperties });
  } catch (error) {
    console.log("Error while fetching list of properties from database!");
    res.status(500).send({ message: "Error while fetching list of properties from database!" });
  }
});

export default router;

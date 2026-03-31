import { Router, Request, Response } from "express";
import { dummyPropertyData } from "seed";
import {
  addNewProperty,
  getListOfProperties,
  getPropertyByItsId,
  hasUserAlreadyLikedProperty,
  likeProperty,
  listOfLikedPropertiesOfUser,
  seedProperty,
} from "src/controller/propertyController";
// import { preparedIncreaseViewsOfProperty } from "src/db/preparedStatement";
import isLoggedIn from "src/middleware/isLoggedIn";
import { AppError, AuthError, NotFoundError } from "src/utils/error";

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
 * @route               /api/v1/property/new
 * @method              POST
 * @params title        string - title of the property
 * @params description  string - description of the property
 * @params sale         boolean - is property on sale or on rent. true if is on sale
 * @params address      string - address of the property
 * @params price        string - price of property (without comma and Rs or $) E.g. 40000
 * @params imageUrl     string[] - link of the property images
 * @desc                Add new property
 * @access              Auth User
 */
router.route("/new").post(isLoggedIn, async (req: Request, res: Response) => {
  const { title, description, sale, address, price, imageUrl } = req.body;

  const userId = req.session.userId;
  if (!userId) {
    throw new AuthError("Login to continue!");
  }

  const addedProperty = await addNewProperty(userId, title, description, sale, address, price, imageUrl);

  res.status(201).send({ message: "Added new property!", property: addedProperty });
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

router.route("/favourites").get(isLoggedIn, async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new AuthError("Login to continue!");
  }
  const likedProperties = await listOfLikedPropertiesOfUser(req.session.userId);

  res.status(200).send(likedProperties);
});

router.route("/:propertyId").get(async (req: Request<{ propertyId: string }>, res: Response) => {
  try {
    console.log("Fetching property of id:", req.params.propertyId);
    const propertyById = await getPropertyByItsId(req.params.propertyId);

    if (propertyById) {
      res.status(200).send(propertyById);
    } else {
      res.status(404).send({ message: "Property of provided id does not exists!" });
    }
  } catch (error) {
    console.log("Error while fetching property from database!");
    res.status(500).send({ message: "Error while fetching property from database!" });
  }
});

router
  .route("/:propertyId/like")
  .post(isLoggedIn, async (req: Request<{ propertyId: string }>, res: Response) => {
    if (!req.session.userId) {
      throw new AuthError("Login to like the property!");
    }
    const likedProperty = await likeProperty(req.params.propertyId, req.session.userId);

    res.status(200).send({ message: `Property of id ${req.params.propertyId} liked!` });
  });

router
  .route("/:propertyId/liked")
  .get(isLoggedIn, async (req: Request<{ propertyId: string }>, res: Response) => {
    if (!req.session.userId) {
      throw new AuthError("Login to coninue!");
    }

    const userAlreadyLikedProperty = await hasUserAlreadyLikedProperty(
      req.params.propertyId,
      req.session.userId,
    );

    res.status(200).send({ liked: userAlreadyLikedProperty });
  });

export default router;

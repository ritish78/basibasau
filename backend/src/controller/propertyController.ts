import db from "src/db";
import {
  preparedAddLikeToProperty,
  preparedDecreaseLikeOfProperty,
  preparedGetListOfProperties,
  preparedGetPropertyByItsId,
  preparedIncreaseLikeOfProperty,
  preparedRemoveLikeFromProperty,
  preparedUserHasLikedProperty,
} from "src/db/preparedStatement";
import { property } from "src/models/property";
import { BadRequestError, NotFoundError } from "src/utils/error";

/**
 * @param dummyPropertyData array of property
 */
export const seedProperty = async (dummyPropertyData) => {
  await db.transaction(async (tx) => {
    for (const row of dummyPropertyData) {
      try {
        await tx.insert(property).values([
          {
            sellerId: row.sellerId,
            title: row.title,
            description: row.description,
            sale: row.sale,
            address: row.address,
            price: row.price,
            imageUrl: row.imageUrl,
          },
        ]);
      } catch (error) {
        console.log(`Error inserting row: ${JSON.stringify(row)}`);
        console.log(error);
      }
    }
  });
};

/**
 * @returns     list of properties
 */
export const getListOfProperties = async () => {
  const listOfProperties = await preparedGetListOfProperties.execute();

  return listOfProperties;
};

/**
 * @param id    string - id of the property to fetch
 * @returns     property | null - property by its id
 */
export const getPropertyByItsId = async (id: string) => {
  const [propertyByItsId] = await preparedGetPropertyByItsId.execute({ propertyId: id });

  return propertyByItsId;
};

/**
 * @param propertyId    string - id of the property to like
 * @param userId        string - id of the user who has liked property
 */
export const likeProperty = async (propertyId: string, userId: string) => {
  const propertyByItsId = await getPropertyByItsId(propertyId);

  if (!propertyByItsId) {
    throw new NotFoundError("Property to like/unlike does not exists!");
  }

  const [userHasAlreadyLikedProperty] = await preparedUserHasLikedProperty.execute({ propertyId, userId });

  console.log("User has Already Liked Property:", userHasAlreadyLikedProperty);
  console.log("User has Already Liked Property:", userHasAlreadyLikedProperty);
  console.log("User has Already Liked Property:", userHasAlreadyLikedProperty);

  if (userHasAlreadyLikedProperty) {
    //The better approach is to create a transaction like in the above seedProperty function
    //instead of having in a Promise.all as one of the promise might fail in Promise.all
    await Promise.all([
      preparedRemoveLikeFromProperty.execute({ propertyId, userId }),
      preparedDecreaseLikeOfProperty.execute({ propertyId }),
    ]);
  } else {
    await Promise.all([
      preparedAddLikeToProperty.execute({ userId, propertyId }),
      preparedIncreaseLikeOfProperty.execute({ propertyId }),
    ]);
  }
};

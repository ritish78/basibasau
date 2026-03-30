import db from "src/db";
import { preparedGetListOfProperties } from "src/db/preparedStatement";
import { property } from "src/models/property";
import { BadRequestError } from "src/utils/error";

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
  try {
    const listOfProperties = await preparedGetListOfProperties.execute();

    return listOfProperties;
  } catch (error) {
    throw new BadRequestError("Could not get list of properties!");
  }
};

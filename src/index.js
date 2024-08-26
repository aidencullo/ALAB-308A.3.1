// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

/**
 * Retrieves user data from multiple databases.
 *
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's data.
 */
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    // Start both database queries in parallel.
    const dbPromise = central(id);
    const vaultPromise = vault(id);

    // Wait for central to resolve and determine the correct database.
    const dbName = await dbPromise;
    const personalDataPromise = dbs[dbName](id);

    // Wait for all promises to resolve.
    const [personalData, secretPersonalData] = await Promise.all([
      personalDataPromise,
      vaultPromise,
    ]);

    return {
      id,
      ...personalData,
      ...secretPersonalData,
    };
  } catch (error) {
    console.error(`Error retrieving data for user ${id}:`, error);
    throw new Error(`Failed to retrieve user data for ID ${id}`);
  }
}

async function timedFunction() {
  console.time('myFunction');
  try {
    const response = await getUserData(1);
    console.log(response); // You can remove or modify this line as needed.
  } catch (error) {
    console.error(error.message);
  } finally {
    console.timeEnd('myFunction');
  }
}

timedFunction();

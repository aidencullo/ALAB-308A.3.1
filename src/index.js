// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// As an additional requirement, note that each database request takes 100ms to respond. However, your function must complete in 200ms or less. Since there are three different databases, you must query; one might assume that the minimum time to do so would be 300ms, but that is not the case.


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
    db3: db3
  };

  try {
    const db = await central(id);
    const [personalData, secretPersonalData] = await Promise.all([
      dbs[db](id),
      vault(id)
    ]);

    return {
      id,
      ...personalData,
      ...secretPersonalData
    };
  } catch (error) {
    console.error(`Error retrieving data for user ${id}:`, error);
    throw error;  // Re-throw the error after logging it
  }
}

// Start timing
console.time('myFunction');

getUserData(1)
  .then(console.log)
  .catch(error => console.error('Error:', error))
  .finally(() => {
    console.timeEnd('myFunction');
  });

// Sample output object format:
// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//    

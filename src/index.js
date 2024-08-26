import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    const dbPromise = central(id);
    const vaultPromise = vault(id);

    const dbName = await dbPromise;
    const personalDataPromise = dbs[dbName](id);

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


getUserData(1)
  .then(console.log)
  .catch(console.error);

import { central, db1, db2, db3, vault } from "./databases.js";
import { testSuite } from "./tests.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  const dbPromise = central(id);
  const dbName = await dbPromise;
  const personalDataPromise = dbs[dbName](id);
  const vaultPromise = vault(id);
  const [personalData, secretPersonalData] = await Promise.all([
    personalDataPromise,
    vaultPromise,
  ]);

  return {
    id,
    ...personalData,
    ...secretPersonalData,
  };
}

testSuite(getUserData);

// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  const db = await central(id);
  const person = await dbs[db](id);
  const secretPerson = await vault(id);
  console.log(person);
  console.log(secretPerson);
  return person;
}

getUserData(1);


// sample output obj
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
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }

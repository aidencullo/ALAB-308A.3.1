export async function testSuite(getUserData) {

  Array.from({ length: 10 }, (_, i) => i + 1).map(async (i) => {
    try {
      const userData = await getUserData(i);
      console.log(`User data for IDI${i}:`, userData);
    } catch (error) {
      console.error(`Error retrieving data for user ${i}:`, error);
    }
  });

  try {
    const userData = await getUserData(11);
  } catch (error) {
    console.error(`Error retrieving data for user 11:`, error);
  }

  try {
    const userData = await getUserData(12);
  } catch (error) {
    console.error(`Error retrieving data for user 12:`, error);
  }

  try {
    const userData = await getUserData(0);
  } catch (error) {
    console.error(`Error retrieving data for user 0:`, error);
  }

  try {
    const userData = await getUserData(true);
  } catch (error) {
    console.error(`Error retrieving data for user true:`, error);
  }

  try {
    const userData = await getUserData('');    
  } catch (error) {
    console.error(`Error retrieving data for user '':`, error);
  }

}

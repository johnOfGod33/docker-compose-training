require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_PORT } = process.env;
const { MongoClient } = require("mongodb");

const URI =
  DB_USERNAME && DB_PASSWORD
    ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=admin`
    : `mongodb://${DB_HOST}:${DB_PORT}/?authSource=admin`;

const client = new MongoClient(URI);

(async () => {
  try {
    await client.connect();
    await createUserVisit(client.db(`${DB_NAME}`));

    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
})();

const createUserVisit = async (db) => {
  try {
    let result = await db
      .collection("visit")
      .insertOne({ user: "jean", visit: 0 });

    let index = await db
      .collection("visit")
      .createIndex({ user: 1 }, { unique: true });

    console.log(result);
    console.log(index);
  } catch (err) {
    console.log(err);
  }
};
module.exports = client.db("docker");

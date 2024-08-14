require("dotenv").config();
const { createClient } = require("redis");
const express = require("express");
const cors = require("cors");
const PORT = 5000 || process.env.PORT;
const client = createClient({ url: "redis://redis:6379" });
const app = express();

(async () => {
  try {
    await client.connect();
    console.log("client connected");
  } catch (err) {
    console.log("error:", err);
  }
})();

const getVisitCount = async () => {
  return await client.incr("count");
};

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let count = await getVisitCount();
    res.send(`Hello world, I've been seen ${count} times`);
  } catch (err) {
    console.error("Error while getting count:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`app listen at port ${PORT}`);
});

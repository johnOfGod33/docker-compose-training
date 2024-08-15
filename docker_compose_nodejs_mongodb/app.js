require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const db = require("./configDb");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await db
      .collection("visit")
      .updateOne({ user: "jean" }, { $inc: { visit: 1 } });
    let visitCount = await db.collection("visit").findOne({ user: "jean" });

    console.log(visitCount);
    res.send(
      `hello world i'm training docker compose again with mongoDb now, we visit me ${visitCount.visit} times`
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`app listen at port ${PORT}`);
});

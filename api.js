const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const tweets = require("./src/twitter/routes");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 3,
});

app.use(express.json());
app.use(express.static("public"));
app.use(limiter);
app.set("trust proxy", 1);

app.post("/api/tweet", limiter, async (req, res, next) => {
  try {
    await tweets.postTweet(req.body.status);
    res.json({ message: "Tweet postado com sucesso!" });
    console.log(`Tweet postado com sucesso! ${req.body.status}`);
  } catch (error) {
    const err = error[0];
    if (err.code === 187) {
      console.log(`Tweet duplicado! ${req.body.status}`);
      res.status(400).json(err);
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is ONLINE!");
});

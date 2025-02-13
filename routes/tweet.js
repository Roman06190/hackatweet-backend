var express = require("express");
var router = express.Router();

require("../models/connection");
const Tweet = require("../models/tweet");
const { now } = require("mongoose");

router.post("/tweet", (req, res) => {
  const newTweet = new Tweet({
    content: req.body.tweet,
    date: Date.now(),
  });
  newTweet.save().then(() => {
    res.json({ result: true, content: req.body.tweet });
  });
});

router.get("/alltweet", (req, res) => {
  res.json(Tweet);
});

router.get("/findtweet/:author", (req, res) => {
  const author = req.params.author;
  const userTweet = (data) => data.author.toLowerCase() === author;
  if (userTweet.length === 0) {
    res.json({
      resulst: false,
      error: "Aucun message trouvé pour cet utilisateur",
    });
  }
  res.json(userTweet);
});

module.exports = router;

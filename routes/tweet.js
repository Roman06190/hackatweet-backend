var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

require("../models/connection");
const Tweet = require("../models/tweet");

router.post("/tweet", (req, res) => {
  console.log("req:", req.body.id);
  const newTweet = new Tweet({
    content: req.body.tweet,
    date: Date.now(),
    author: req.body.id,
    hashtag: req.body.id,
  });
  newTweet.save().then((data) => {
    res.json({
      result: true,
      content: req.body.tweet,
      author: req.body.id,
    });
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

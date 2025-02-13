var express = require("express");
var router = express.Router();

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

router.get("/alltweet", (req, res) => {});

router.get("/findtweet", (req, res) => {});

module.exports = router;

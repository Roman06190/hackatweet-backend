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

router.get("/alltweet", (req, res) => {});

router.get("/findtweet", (req, res) => {});

module.exports = router;

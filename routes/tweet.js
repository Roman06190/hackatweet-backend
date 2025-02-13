var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

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
  content: req.body.Tweet,
    content.save().then((data) => {
      res.json({
        result: true,
        content: req.body.tweet,
      });
    });
});

router.get("/findtweet/:author", (req, res) => {
  User.findOne({ author: req.params.author }).then((data) => {
    if (data) {
      console.log("data is", data);
      res.json({ result: true, findtweet: data.findtweet });
    } else {
      res.json({ result: false, error: "No tweets found" });
    }
  });
});

module.exports = router;

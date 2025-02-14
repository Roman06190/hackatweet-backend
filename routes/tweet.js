var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweet");
const Hashtag = require("../models/hashtag");

router.post("/newTweet", async (req, res) => {
  let tagId;
  let dbData = await Hashtag.findOne({
    hashtag: { $regex: new RegExp(req.body.hashtag, "i") },
  });
  //Si pas de tag existant création d'un nouveau tag
  if (dbData === null) {
    const newHashtag = await new Hashtag({
      hashtag: req.body.hashtag,
      tweet: [],
    });
    dbData = await newHashtag.save();
  }
  tagId = dbData._id;

  const newTweet = new Tweet({
    content: req.body.tweet,
    date: Date.now(),
    author: req.body.id,
    hashtag: [tagId],
  });

  //test
  const savedTweet = await newTweet.save();

  dbData.tweet.push(savedTweet._id);
  await dbData.save();

  const populateTweet = await Tweet.findById(savedTweet._id).populate(
    "hashtag"
  );

  res.json({
    result: true,
    data: populateTweet,
  });
});

router.get("/allTweets", async (req, res) => {
  const tweets = await Tweet.find().populate("author");
  res.json({ tweets: tweets });
});

router.post("/hashtag", (req, res) => {
  Hashtag.findOne({
    hashtag: { $regex: new RegExp(req.body.hashtag, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      const newHashtag = new Hashtag({
        hashtag: req.body.hashtag,
        tweet: [req.body.id],
      });
      newHashtag.save().then((data) => {
        res.json({ result: true, hashtag: req.body.hashtag });
      });
    } else {
    }
  });
});

router.get("/", (req, res) => {
  Hashtag.find().then((data) => {
    res.json({ result: true, hashtag: data });
  });
});

router.get("/:hashtag", (req, res) => {
  Hashtag.findOne({ hashtag: req.params.hashtag })
    .populate("tweet")
    .then((data) => {
      res.json({ result: true, hashtag: data });
    });
});

router.delete("/dlttweets", (req, res) => {
  Tweet.deleteOne().then((data) => {
    res.send({ result: true, id: data });
  });
});
module.exports = router;

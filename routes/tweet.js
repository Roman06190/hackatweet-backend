var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweet");
const Hashtag = require("../models/hashtag");

router.post("/newTweet", async (req, res) => {
  let tagId;
  const dbData = await Hashtag.findOne({
    hashtag: { $regex: new RegExp(req.body.hashtag, "i") },
  });
  //Si pas de tag existant création d'un nouveau tag
  if (dbData === null) {
    const newHashtag = await new Hashtag({
      hashtag: req.body.hashtag,
    });
    const newDoc = await newHashtag.save();
    tagId = await newDoc._id;
  } else {
    tagId = dbData._id;
  }

  console.log("tag Id is:", tagId);

  // const newTweet = new Tweet({
  //   content: req.body.tweet,
  //   date: Date.now(),
  //   author: req.body.id,
  //   hashtag: req.body.id,
  // });
  // newTweet.save().then((data) => {
  //   res.json({
  //     result: true,
  //     data: data,
  //   });
  // });
});

router.get("/allTweets", async (req, res) => {
  const tweets = await Tweet.find();
  AuTHOR.findOne({ AuTHOR: req.params.author })
    .populate("author")
    .then((data) => {
      res.json({ tweets: data });
    });
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

module.exports = router;

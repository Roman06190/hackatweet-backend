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
  if (!dbData) {
    const newHashtag = await new Hashtag({
      hashtag: req.body.hashtag,
      tweet: [],
    });
    dbData = await newHashtag.save();
    // const newDoc = await newHashtag.save();
    // tagId = await newDoc._id;
  }
  tagId = dbData._id;

  // console.log("tag Id is:", tagId);

  const newTweet = new Tweet({
    content: req.body.tweet,
    date: Date.now(),
    author: req.body.id,
    hashtag: [tagId],
  });

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
  const tweets = await Tweet.find();
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

module.exports = router;

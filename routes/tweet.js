var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweet");
const Hashtag = require("../models/hashtag");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/newTweet", async (req, res) => {
  if (!checkBody(req.body, ["tweet", "token"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  let tagId;
  let theAuthor = await User.findOne({
    token: req.body.token,
  });
  console.log("The author is", theAuthor);
  let dbData = await Hashtag.findOne({
    hashtag: { $regex: new RegExp(req.body.hashtag, "i") },
  });
  // console.log("blabbla:", theAuthor);
  //Si pas de tag existant création d'un nouveau tag
  if (dbData === null) {
    const newHashtag = await new Hashtag({
      hashtag: req.body.hashtag,
      tweet: [],
    });
    dbData = await newHashtag.save();
  }
  theOne = theAuthor._id;
  tagId = dbData._id;
  author = User.find();
  // console.log("author is:", theOne);

  const newTweet = new Tweet({
    content: req.body.tweet,
    date: Date.now(),
    author: theOne,
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

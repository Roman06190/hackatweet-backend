var express = require("express");
var router = express.Router();

const Hashtag = require("../models/hashtag");

router.post("/", (req, res) => {
  Hashtag.findOne({
    hashtag: { $regex: new RegExp(req.body.hashtag, i) },
  }).then((dbData) => {
    if (dbData === null) {
      const newHashtag = new Hashtag({
        hashtag: req.body.hashtag,
        tweet: [req.body.id],
      });
    } else {
    }
  });

  newHashtag.save().then((data) => {
    res.json({ result: true, hashtag: req.body.hashtag });
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

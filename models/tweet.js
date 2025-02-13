const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  content: String,
  date: Date,
  auhtor: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hashtag: { type: mongoose.Schema.Types.ObjectId, ref: "hashtags" }
  like: Number,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;

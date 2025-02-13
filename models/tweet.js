const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  content: String,
  date: Date,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;

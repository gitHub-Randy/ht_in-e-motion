const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
      email: String,
      password: String,
      userName: String,
  })
);

module.exports = ChosenEmotion;
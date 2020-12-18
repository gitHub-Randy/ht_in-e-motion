const mongoose = require("mongoose");

const Anders = mongoose.model(
  "Anders",
  new mongoose.Schema({
      emotionName: String,
  })
);

module.exports = Anders;
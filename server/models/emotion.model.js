const mongoose = require("mongoose");

const ChosenEmotion = mongoose.model(
  "ChosenEmotion",
  new mongoose.Schema({
    chosenEmotions: [
      {
        category: String,
        emotionName: String,
        strength: Number,
        gifUrl: String,
      }
    ],
    averageDayEmotion: String,
    chosenDate: Date,
    userId: String,
  })
);

module.exports = ChosenEmotion;
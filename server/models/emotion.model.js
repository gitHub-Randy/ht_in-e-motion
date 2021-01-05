const mongoose = require("mongoose");

const ChosenEmotion = mongoose.model(
  "ChosenEmotion",
  new mongoose.Schema({
    chosenEmotions: [
      {
        category: String,
        emotionName: String,
        strength: Number,
        description: String,
        gifUrl: String,
      }
    ],
    chosenDate: Date,
    userId: String,
  })
);

module.exports = ChosenEmotion;
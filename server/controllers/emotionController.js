const express = require('express');
const ChosenEmotion = require('../models/emotion.model');

module.exports = {
    getAll(req, res){
        ChosenEmotion.find().then(data => {
            return res.send(data);
        })
    },

    create(req, res) {
        console.log(req.body)
        let data = req.body;
        let newEmotion = new ChosenEmotion({

            chosenEmotions: data
        }).save().then(newChosenEmotions =>{
            console.log("New Emotion: " + newChosenEmotions);

            return res.send(newChosenEmotions)

        });
         
    },
  
}

const express = require('express');
const Anders = require('../models/anders.model');

module.exports = {
    getAll(req, res){
        Anders.find().then(data => {
            return res.send(data);
        })
    },

    create(req, res) {
        let newAnders = new Anders({
            emotionName: req.body.emotionName
        });
        newAnders.save().then(data => {
            return res.send(data);
        })
    },

    update(req, res) {
        Anders.findOne(req.params.id).then(data => {
            data.emotionName = req.body.emotionName;
        });
        Anders.save().then(data => {
            return res.send(data);
        })
    },

    destroy(req, res) {
        Anders.findByIdAndDelete(req.params.id).then(data => {
            return res.send(data)
        })
    }
}


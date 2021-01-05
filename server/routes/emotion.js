var express = require('express');
var router = express.Router();
const emotionController = require('../controllers/emotionController');

router.get('/emotion/chosenEmotions', emotionController.getAll);
router.post('/emotion/chosenEmotions', emotionController.create);

module.exports = router;

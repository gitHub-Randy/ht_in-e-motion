var express = require('express');
var router = express.Router();
const andersController = require('../controllers/andersController');

router.get('/emotion/anders', andersController.getAll);
router.post('/emotion/anders', andersController.create);
router.put('/emotion/anders/:id', andersController.update);
router.delete('/emotion/anders/:id', andersController.destroy)
// router.get('/emotion/anders',andersController.test)
module.exports = router;

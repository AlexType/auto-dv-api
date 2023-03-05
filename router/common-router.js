const Router = require('express');
const router = new Router();
const commonController = require('../controllers/common-controller');

router.get('/cars', commonController.cars);
router.get('/reviews', commonController.reviews);
router.get('/curr-rate', commonController.currRate);
router.get('/popular-cars', commonController.popularCars);
router.post('/send-mail', commonController.sendMail);

module.exports = router;

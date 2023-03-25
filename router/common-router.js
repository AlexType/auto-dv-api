const Router = require('express');
const router = new Router();
const roleMiddleware = require('../middleware/role-middleware');
const commonController = require('../controllers/common-controller');

router.get('/cars', commonController.cars);
router.get('/reviews', commonController.reviews);
router.get('/curr-rate', commonController.currRate);
router.get('/popular-cars', commonController.popularCars);
router.get('/user-requests', roleMiddleware(['ADMIN']), commonController.userRequests);
router.post('/send-mail', commonController.sendMail);
router.post('/update-user-request', roleMiddleware(['ADMIN']), commonController.updateUserRequest);
router.post('/delete-user-request', roleMiddleware(['ADMIN']), commonController.deleteUserRequest);

module.exports = router;

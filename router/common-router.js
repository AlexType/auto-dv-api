const Router = require('express');
const router = new Router();
const roleMiddleware = require('../middleware/role-middleware');
const CommonController = require('../controllers/common-controller');

router.get('/cars', CommonController.cars);
router.get('/reviews', CommonController.reviews);
router.get('/curr-rate', CommonController.currRate);
router.get('/popular-cars', CommonController.popularCars);
router.get('/user-requests', roleMiddleware(['ADMIN']), CommonController.userRequests);
router.post('/send-mail', CommonController.sendMail);
router.post('/update-user-request', roleMiddleware(['ADMIN']), CommonController.updateUserRequest);
router.post('/delete-user-request', roleMiddleware(['ADMIN']), CommonController.deleteUserRequest);

module.exports = router;

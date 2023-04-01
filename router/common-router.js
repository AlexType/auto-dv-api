const Router = require('express');
const router = new Router();
const roleMiddleware = require('../middleware/role-middleware');
const CommonController = require('../controllers/common-controller');

router.get('/cars', CommonController.cars);
router.get('/reviews', CommonController.reviews);
router.get('/curr-rate', CommonController.currRate);
router.get('/popular-cars', CommonController.popularCars);
router.post('/send-mail', CommonController.sendMail);
router.get('/marks', roleMiddleware(['ADMIN']), CommonController.marks);
router.get('/models', roleMiddleware(['ADMIN']), CommonController.models);
router.get('/user-requests', roleMiddleware(['ADMIN']), CommonController.userRequests);
router.post('/update-user-request', roleMiddleware(['ADMIN']), CommonController.updateUserRequest);
router.post('/delete-user-request', roleMiddleware(['ADMIN']), CommonController.deleteUserRequest);
router.post('/add-car', roleMiddleware(['ADMIN']), CommonController.addCar);
router.post('/update-car', roleMiddleware(['ADMIN']), CommonController.updateCar);
router.post('/delete-car', roleMiddleware(['ADMIN']), CommonController.deleteCar);

module.exports = router;

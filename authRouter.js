const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Пароль должен быть больше 4 и меньше 10 символов'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.post('/send-mail', controller.sendMail);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.get('/reviews', controller.reviews);
router.get('/popular-cars', controller.popularCars);
router.get('/cars', controller.cars);
router.get('/curr-rate', controller.currRate);

module.exports = router;

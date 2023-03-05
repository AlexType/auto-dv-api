const User = require('./models/User');
const Role = require('./models/Role');
const Auto = require('./models/Auto');
const Review = require('./models/Review');
const mailService = require('./service/mail.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');
const request = require('request');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      console.log(userRole);
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async sendMail(req, res) {
    try {
      const { name, number, comment } = req.body;
      await mailService.sendMail(name, number, comment);
      return res.json();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async reviews(req, res) {
    try {
      return res.json(await Review.find());
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async currRate(req, res) {
    try {
      const url = 'http://currate.ru/api/?get=rates&pairs=JPYRUB,EURRUB,USDRUB&key=71560a08ff5a9d61e342cf9af1d811d8';
      request.get({ url }, (error, response, body) => res.json(JSON.parse(body)));
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async popularCars(req, res) {
    try {
      return res.json(await Auto.find());
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async cars(req, res) {
    try {
      const mark = req.query.mark;
      if (!mark) return res.json(await Auto.find());

      return res.json(await Auto.find({ mark }));
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }
}

module.exports = new authController();

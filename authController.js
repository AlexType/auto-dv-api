const User = require('./models/User');
const Role = require('./models/Role');
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
      return res.json([
        {
          img: 'https://severdv.pro/storage/235/IMG_3620.jpeg',
          name: 'Алекс Рыжий',
          date: new Date(),
          rating: '4.0',
          text: 'Компания пригнала мне с аукционов Японии БМВ Х4 218 года. За что им безумно благодарен, так как и по цене обошлась она мне не так уж дорого. Менеджер Игорь был всегда на связи. Рекомендую!',
        },
        {
          img: 'https://severdv.pro/storage/233/scale_1200.webp',
          name: 'Егор Норовков',
          date: new Date('07.11.2022'),
          rating: '5.0',
          text: 'Очень хотел купить автомобиль с аукциона в Японии. Обратился в эту компанию. Быстро все получилось оформить. Взял Хонду визель . Ребята порядочные. По цене обошлось выгодно. Спасибо.',
        },
        {
          img: 'https://severdv.pro/storage/232/Снимок-экрана-2022-07-29-в-18.14.30.png',
          name: 'Alik Gromov',
          date: new Date('12.08.2022'),
          rating: '4.5',
          text: 'Через Инсту нашел и заинтересовался, а потом и созвонился. Итог- Выхватил гибрид Honda Vezel 18 года))). Менеджеру Максиму спасибо за профессионализм в работе. Покупка из Красноярска, все ОК. Рекомендую фирму))).',
        },
      ]);
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
      return res.json([
        {
          img: 'https://admin.severdv.pro/storage/277/conversions/C-HR-thumb.jpg',
          mark: 'Toyota',
          model: 'C-HR',
          cc: 1800,
          engine: 'Бензин + электро',
          year: 2019,
          price: 1565000,
        },
        {
          img: 'https://8.ajes.com/imgz/74vpf7QMLJjGAU8NspOj8ZprnViLy0f6lEriJBr0wpBPtykqdxDxWe',
          mark: 'SUBARU',
          model: 'WRX',
          cc: 2000,
          engine: 'Бензин',
          year: 2015,
          price: 2732130,
        },
        {
          img: 'https://admin.severdv.pro/storage/278/conversions/LCP-thumb.jpg',
          mark: 'Toyota',
          model: 'LAND CRUISER PRADO',
          cc: 2700,
          engine: 'Бензин',
          year: 2019,
          price: 2980000,
        },
        {
          img: 'https://admin.severdv.pro/storage/279/conversions/benz-cla-thumb.jpg',
          mark: 'MERCEDES BENZ',
          model: 'CLA CLASS',
          cc: 2000,
          engine: 'Бензин',
          year: 2019,
          price: 2223000,
        },
        {
          img: 'https://8.ajes.com/imgz/2LdAROxsRgFZBPr3SBnenVVwxhAPWWwKyuxOMKrRPWNxEMChGy1mMVGvvcXqjAq',
          mark: 'TOYOTA',
          model: 'AQUA',
          cc: 1500,
          engine: 'Гибрид',
          year: 2012,
          price: 903200,
        },
        {
          img: 'https://8.ajes.com/imgz/2LdAROxsRgFZBPr3SBnenVVwxhAPWWwKyuxOMKrRPWPbA9kGMnoPvuC3riWr1Mi',
          mark: 'TOYOTA',
          model: 'COROLLA FIELDER',
          cc: 1500,
          engine: 'Гибрид',
          year: 2016,
          price: 1196925,
        },
        {
          img: 'https://8.ajes.com/imgz/2LdAROxsRgFZBPr3SBnenVVwxhAPWWwKyuxOMKrRPWSnr7IT2l42nw5f1e39EHi',
          mark: 'TOYOTA',
          model: 'PRIUS',
          cc: 1800,
          engine: 'Гибрид',
          year: 2016,
          price: 1146915,
        },
        {
          img: 'https://8.ajes.com/imgz/2LdAROxsRgFZBPr3SBnenVVwxhAPWWwKyuxOMKrRPWSnr7IT2l42nw5f1e39EHi',
          mark: 'TOYOTA',
          model: 'PRIUS',
          cc: 1800,
          engine: 'Гибрид',
          year: 2016,
          price: 1146915,
        },
        {
          img: 'https://admin.severdv.pro/storage/280/conversions/SORENTO-thumb.jpg',
          mark: 'KIA',
          model: 'OTHER',
          cc: 2200,
          engine: 'Дизель',
          year: 2019,
          price: 2120000,
        },
        {
          img: 'https://admin.severdv.pro/storage/281/conversions/Volvo-XC6-thumb.jpg',
          mark: 'VOLVO',
          model: 'XC60',
          cc: 2000,
          engine: 'Дизель',
          year: 2019,
          price: 3200000,
        },
        {
          img: 'https://admin.severdv.pro/storage/282/conversions/FREED-thumb.jpg',
          mark: 'HONDA',
          model: 'FREED',
          cc: 1500,
          engine: 'Бензин',
          year: 2019,
          price: 1220000,
        },
        {
          img: 'https://admin.severdv.pro/storage/283/conversions/PRIUS-thumb.jpg',
          mark: 'TOYOTA',
          model: 'PRIUS',
          cc: 1800,
          engine: 'Гибрид',
          year: 2019,
          price: 1380000,
        },
        {
          img: 'https://admin.severdv.pro/storage/285/conversions/BMW-x5-thumb.jpg',
          mark: 'BMW',
          model: 'X5',
          cc: 3000,
          engine: 'Дизель',
          year: 2019,
          price: 3720000,
        },
        {
          img: 'https://8.ajes.com/imgz/2LdAROxsRgFZBPr3SBnenVVwxhAPWWwKyuxOMKrRPWQ1xObTki74MSI0l9ZUbiB',
          mark: 'SUBARU',
          model: 'XV',
          cc: 2000,
          engine: 'Гибрид',
          year: 2013,
          price: 1588040,
        },
      ]);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }
}

module.exports = new authController();

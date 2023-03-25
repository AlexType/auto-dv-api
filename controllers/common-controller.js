const Auto = require('../models/Auto');
const Review = require('../models/Review');
const UserRequest = require('../models/UserRequest');
const mailService = require('../service/mail.service');
const request = require('request');

class CommonController {
  async sendMail (req, res) {
    try {
      const { name, number, comment } = req.body;
      const userRequest = new UserRequest({ name, number, comment, dateCreated: new Date() });
      await userRequest.save();
      await mailService.sendMail(name, number, comment);
      return res.json();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async reviews (req, res) {
    try {
      return res.json(await Review.find());
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async currRate (req, res) {
    try {
      const url = 'http://currate.ru/api/?get=rates&pairs=JPYRUB,EURRUB,USDRUB&key=71560a08ff5a9d61e342cf9af1d811d8';
      request.get({ url }, (_error, _response, body) => res.json(JSON.parse(body)));
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async popularCars (req, res) {
    try {
      return res.json(await Auto.find());
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async cars (req, res) {
    try {
      const mark = req.query.mark;
      if (!mark) return res.json(await Auto.find());

      return res.json(await Auto.find({ mark }));
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async userRequests (req, res) {
    try {
      return res.json(await UserRequest.find());
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async updateUserRequest (req, res) {
    try {
      const { id, adminMark, called } = req.body;
      await UserRequest.findByIdAndUpdate(id, { adminMark, called });
      return res.json();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }

  async deleteUserRequest (req, res) {
    try {
      const { id } = req.body;
      await UserRequest.deleteOne(id);
      return res.json();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error )' });
    }
  }
}

module.exports = new CommonController();

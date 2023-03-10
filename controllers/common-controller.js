const Auto = require('../models/Auto');
const Review = require('../models/Review');
const mailService = require('../service/mail.service');
const request = require('request');

class commonController {
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

module.exports = new commonController();

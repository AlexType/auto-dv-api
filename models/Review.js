
const { Schema, model } = require('mongoose');

const Review = new Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = model('Review', Review);

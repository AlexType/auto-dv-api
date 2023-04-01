
const { Schema, model } = require('mongoose');

const Auto = new Schema({
  img: { type: String, required: true },
  mark: { type: String, required: true },
  model: { type: String, required: true },
  cc: { type: Number, required: true },
  engine: { type: Number, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true }
});

module.exports = model('Auto', Auto);


const { Schema, model } = require('mongoose');

const CarModel = new Schema({
  name: { type: String, required: true },
  yearFrom: { type: Number, default: null },
  yearTo: { type: Number, default: null },
  markId: { type: Schema.Types.ObjectId, ref: 'CarMark', require: true }
});

module.exports = model('CarModel', CarModel);

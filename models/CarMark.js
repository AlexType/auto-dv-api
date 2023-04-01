
const { Schema, model } = require('mongoose');

const CarMark = new Schema({
  country: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  popular: { type: Boolean, default: false },
  models: [{ type: Schema.Types.ObjectId, ref: 'CarModel', default: [] }]
});

module.exports = model('CarMark', CarMark);

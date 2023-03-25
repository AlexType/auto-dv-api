
const { Schema, model } = require('mongoose');

const UserRequest = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  comment: { type: String, default: '' },
  called: { type: Boolean, default: false, required: true },
  adminMark: { type: String, default: '' },
  dateCreated: { type: Date, required: true }
});

module.exports = model('UserRequest', UserRequest);

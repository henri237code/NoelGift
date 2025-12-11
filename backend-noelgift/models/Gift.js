const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  name: { type: String, required: true }, 
  description: { type: String, required: true },
});

module.exports = mongoose.model('Gift', giftSchema);

const mongoose = require('mongoose');
module.exports = mongoose.model('Department', new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true }));

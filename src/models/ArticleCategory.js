const mongoose = require('mongoose');
module.exports = mongoose.model('ArticleCategory', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: String
}, { timestamps: true }));

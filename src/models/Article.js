const mongoose = require('mongoose');
module.exports = mongoose.model('Article', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  cover: { url: String, publicId: String },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleCategory' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  views: { type: Number, default: 0 }
}, { timestamps: true }));

const mongoose = require('mongoose');
module.exports = mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  summary: String,
  description: { type: String, required: true },
  cover: { url: String, publicId: String },
  gallery: [{ url: String, publicId: String }],
  client: String,
  projectUrl: String,
  technologies: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectCategory' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  order: { type: Number, default: 0 }
}, { timestamps: true }));

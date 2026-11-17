const asyncHandler = require('../utils/asyncHandler');
const slugify = require('../utils/slug');

exports.list = (Model, populate = '') => asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10), 1), 100);
  const filter = {};
  if (req.query.published === 'true') filter.isPublished = true;
  if (req.query.category) filter.category = req.query.category;
  const [items, total] = await Promise.all([
    Model.find(filter).populate(populate).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Model.countDocuments(filter)
  ]);
  res.json({ data: items, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
});
exports.get = (Model, populate = '') => asyncHandler(async (req, res) => {
  const item = await Model.findById(req.params.id).populate(populate);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ data: item });
});
exports.create = (Model, options = {}) => asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.title && !data.slug) data.slug = slugify(data.title);
  if (options.author) data.author = req.user._id;
  if (options.createdBy) data.createdBy = req.user._id;
  if (req.uploadedFiles?.length) {
    if (options.gallery) data.gallery = req.uploadedFiles.map(f => ({ url: f.url, publicId: f.publicId }));
    else data.cover = { url: req.uploadedFiles[0].url, publicId: req.uploadedFiles[0].publicId };
  }
  const item = await Model.create(data);
  res.status(201).json({ data: item });
});
exports.update = (Model) => asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.title && !data.slug) data.slug = slugify(data.title);
  if (req.uploadedFiles?.length) data.cover = { url: req.uploadedFiles[0].url, publicId: req.uploadedFiles[0].publicId };
  const item = await Model.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ data: item });
});
exports.remove = (Model) => asyncHandler(async (req, res) => {
  const item = await Model.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

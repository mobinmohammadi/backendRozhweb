const formidable = require('formidable');
const fs = require('fs/promises');
const cloudinary = require('../config/cloudinary');

// Formidable 2.1.1 parses multipart/form-data; uploaded files are sent to Cloudinary.
function parseMultipart(req, res, next) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
    maxFiles: 12,
    allowEmptyFiles: false
  });
  form.parse(req, async (err, fields, files) => {
    if (err) return next(err);
    try {
      const uploaded = [];
      const allFiles = Object.values(files).flat();
      for (const file of allFiles) {
        if (!file || !file.filepath) continue;
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'company-site',
          resource_type: 'auto'
        });
        uploaded.push({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes
        });
        await fs.unlink(file.filepath).catch(() => {});
      }
      req.body = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, Array.isArray(v) && v.length === 1 ? v[0] : v]));
      req.uploadedFiles = uploaded;
      next();
    } catch (uploadError) { next(uploadError); }
  });
}
module.exports = { parseMultipart };

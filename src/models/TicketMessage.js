const mongoose = require('mongoose');
module.exports = mongoose.model('TicketMessage', new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true },
  attachments: [{ url: String, publicId: String }],
  isInternal: { type: Boolean, default: false }
}, { timestamps: true }));

const mongoose = require('mongoose');
module.exports = mongoose.model('Ticket', new mongoose.Schema({
  ticketNumber: { type: String, unique: true, index: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open', 'pending', 'answered', 'closed'], default: 'open' },
  priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' }
}, { timestamps: true }));

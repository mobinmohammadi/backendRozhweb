const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password are required' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, phone });
  res.status(201).json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
exports.login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password || ''))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
exports.me = asyncHandler(async (req, res) => res.json({ user: req.user }));

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // Full-time, Internship, etc.
  description: { type: String, required: true },
  requirements: [String],
  salary: { type: String },
  status: { type: String, enum: ['active', 'closed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);

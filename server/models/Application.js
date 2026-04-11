const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String }, // URL to uploaded resume
  coverLetter: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);

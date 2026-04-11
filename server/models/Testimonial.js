const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);

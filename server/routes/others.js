const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const Benefit = require('../models/Benefit');
const auth = require('../middleware/auth');

// ---- TESTIMONIALS ----

// @route   GET api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/testimonials', async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error('Testimonials GET error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/testimonials
// @desc    Add a testimonial
// @access  Private (Admin)
router.post('/testimonials', auth, async (req, res) => {
  try {
    const newItem = new Testimonial(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error('Testimonials POST error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/testimonials/:id
// @desc    Update a testimonial
// @access  Private (Admin)
router.put('/testimonials/:id', auth, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ msg: 'Testimonial not found' });
    res.json(item);
  } catch (err) {
    console.error('Testimonials PUT error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private (Admin)
router.delete('/testimonials/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Testimonial removed' });
  } catch (err) {
    console.error('Testimonials DELETE error:', err.message);
    res.status(500).send('Server Error');
  }
});

// ---- BENEFITS ----

// @route   GET api/benefits
// @desc    Get all benefits
// @access  Public
router.get('/benefits', async (req, res) => {
  try {
    const data = await Benefit.find();
    res.json(data);
  } catch (err) {
    console.error('Benefits GET error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/benefits
// @desc    Add a benefit
// @access  Private (Admin)
router.post('/benefits', auth, async (req, res) => {
  try {
    const newItem = new Benefit(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error('Benefits POST error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/benefits/:id
// @desc    Delete a benefit
// @access  Private (Admin)
router.delete('/benefits/:id', auth, async (req, res) => {
  try {
    await Benefit.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Benefit removed' });
  } catch (err) {
    console.error('Benefits DELETE error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

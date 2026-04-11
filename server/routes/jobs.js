const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// @route   GET api/jobs
// @desc    Get all active jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Jobs GET error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/jobs/all
// @desc    Get all jobs (including inactive) - Admin only
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Jobs GET all error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs
// @desc    Add new job
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error('Jobs POST error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error('Jobs PUT error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error('Jobs DELETE error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

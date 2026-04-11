const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// @route   POST api/messages
// @desc    Send a message (contact form)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error('Message POST error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/messages
// @desc    Get all messages
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Message GET error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/messages/:id/read
// @desc    Mark message as read
// @access  Private (Admin)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ msg: 'Message not found' });
    res.json({ msg: 'Message marked as read' });
  } catch (err) {
    console.error('Message PUT read error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/messages/:id
// @desc    Delete a message
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Message deleted' });
  } catch (err) {
    console.error('Message DELETE error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

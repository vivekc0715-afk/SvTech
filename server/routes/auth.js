const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @route   POST api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, admin: { id: admin.id, username: admin.username } });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/setup
// @desc    Setup initial admin (one-time use)
// @access  Public
router.post('/setup', async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ msg: 'Admin already exists' });

    admin = new Admin({ username, password });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();
    res.json({ msg: 'Admin created successfully' });
  } catch (err) {
    console.error('Setup error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

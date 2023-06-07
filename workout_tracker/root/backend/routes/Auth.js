const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');

//controllers
const authController = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Create a new user
// @access  Public
router.post('/signup', authController.signup);

// @route   POST /api/auth/login
// @desc    Login
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/current
// @desc    Return the currently authed user
// @access  Private
router.get('/current', requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send('Unathorized');
  }
  return res.json(req.user);
});

// @route   PUT /api/auth/logout
// @desc    Logout user and clear cookie
// @access  Private
router.get('/logout', requiresAuth, async (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');

// controllers
const retrieveNamesController = require('../controllers/retrieveNamesController');

//      RETRIEVING NAMES     //
///////////////////////////////
// @route   GET /api/splits/:splitId/name
// @desc    get user split name for navigation
// @access  Private
router.get('/splits/:splitId/name', requiresAuth, retrieveNamesController.splitName);

// @route   GET /api/splits/:split_id/workouts/:workout_id/name
// @desc    get user workout name for navigation
// @access  Private
router.get('/splits/:splitId/workouts/:workoutId/name', requiresAuth, retrieveNamesController.workoutName);

module.exports = router;

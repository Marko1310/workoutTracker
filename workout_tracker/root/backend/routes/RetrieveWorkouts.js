const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');

// services
const getDataService = require('../services/getDataService');
const checkDatabaseService = require('../services/checkDatabaseService');

//controllers
const retrieveWorkoutsController = require('../controllers/retrieveWorkoutsController');

//      RETRIEVING DATA     //
///////////////////////////////
// @route   GET /api/splits/current
// @desc    get user splits with list of workouts
// @access  Private
router.get('/splits/current', requiresAuth, retrieveWorkoutsController.getUserSplits);

// @route   GET /api/splits/workouts/:splitId
// @desc    get user workouts with list of exercises from the split
// @access  Private
router.get('/splits/workouts/:splitId', requiresAuth, retrieveWorkoutsController.getUserWorkouts);

// @route   GET /api/splits/workout/:workoutId
// @desc    get current workout
// @access  Private
router.get('/splits/workout/:workoutId', requiresAuth, retrieveWorkoutsController.getCurrentWorkout);

// @route   GET /api/splits/workouts/exercises/prevData/:workoutId
// @desc    get user previous workout
// @access  Private
router.get(
  '/splits/workouts/exercises/prevData/:workoutId',
  requiresAuth,
  retrieveWorkoutsController.getPreviousWorkout,
);

// @route   GET /api/splits/workout/trackData/:workoutId
// @desc    get current track data for the workout
// @access  Private
router.get(
  '/splits/workouts/exercises/currentData/:workoutId',
  requiresAuth,
  retrieveWorkoutsController.getCurrentTrackData,
);

// @route   POST /api/splits/workouts/exercises/history/:exerciseId
// @desc    get history data for exercise
// @access  Private
router.post('/splits/workouts/history/:workoutId', requiresAuth, retrieveWorkoutsController.getHistoryTrackData);

module.exports = router;

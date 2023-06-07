const express = require('express');
const router = express.Router();

//middleware
const requiresAuth = require('../middleware/permission');

//controllers
const addDataController = require('../controllers/addDataController');

//      ADDING DATA     //
///////////////////////////////
// @route   POST /api/splits/new
// @desc    Create new split
// @access  Private
router.post('/split/new', requiresAuth, addDataController.newSplit);

// @route   POST /api/split/workout/new
// @desc    Create new workout in the workout split
// @access  Private
router.post('/split/workout/new', requiresAuth, addDataController.newWorkout);

// @route   POST /api/split/workout/exercise/new
// @desc    Create new exercise in the workout split
// @access  Private
router.post('/split/workout/exercise/new', requiresAuth, addDataController.newExercise);

// @route   POST /api/split/workout/exercise/set
// @desc    Add new set to a given exercises of a certain workout
// @access  Private
router.post('/split/workout/exercise/set/new', requiresAuth, addDataController.newSet);

// @route   POST /api/split/workout/exercise/track
// @desc    Update new track data
// @access  Private
router.post('/split/workout/exercise/track', requiresAuth, addDataController.newTrackData);

module.exports = router;

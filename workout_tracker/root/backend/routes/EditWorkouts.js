const express = require('express');
const router = express.Router();

//controllers
const editWorkoutsController = require('../controllers/editWorkoutsController');

//middleware
const requiresAuth = require('../middleware/permission');

//      EDITING DATA     //
///////////////////////////////
// @route   DELETE /api/split/delete
// @desc    Delete split
// @access  Private
router.delete('/split/delete', requiresAuth, editWorkoutsController.deleteSplit);

// @route   DELETE /api/split/workout/delete
// @desc    Delete workout in a split
// @access  Private
router.delete('/split/workout/delete', requiresAuth, editWorkoutsController.deleteWorkout);

// @route   DELETE /api/split/workout/exercise/delete
// @desc    Delete exercise in a workout
// @access  Private
router.delete('/split/workout/exercise/delete', requiresAuth, editWorkoutsController.deleteExercise);

// @route   DELETE /api/split/workout/exercise/set/delete
// @desc    Delete set in exercise
// @access  Private
router.delete('/split/workout/exercise/set/delete', requiresAuth, editWorkoutsController.deleteSet);

// @route   POST /api/split/workout/editDay
// @desc    update workout day
// @access  Private
router.post('/split/workout/editDay', requiresAuth, editWorkoutsController.updateWorkoutDay);

module.exports = router;

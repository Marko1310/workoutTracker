const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');

// services
const editDataService = require('../services/editDataService');
const checkDatabaseService = require('../services/checkDatabaseService');

//      EDITING DATA     //
///////////////////////////////
// @route   DELETE /api/split/delete
// @desc    Delete split
// @access  Private
router.delete('/split/delete', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { split_id } = req.body;

    const isValidSplitId = await checkDatabaseService.checkSplitId(split_id, user_id);
    if (isValidSplitId === 0) {
      return res.status(400).send('Unathorized');
    }

    const deleteSplit = await editDataService.deleteSplit(split_id, user_id);
    res.json(deleteSplit.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   DELETE /api/split/workout/delete
// @desc    Delete workout in a split
// @access  Private
router.delete('/split/workout/delete', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { split_id, workout_id } = req.body;

    const isValidSplitId = await checkDatabaseService.checkSplitId(split_id, user_id);
    const isValidWorkoutId = await checkDatabaseService.checkWorkoutId(workout_id, user_id);
    if (isValidSplitId === 0 || isValidWorkoutId === 0) {
      return res.status(400).send('Unathorized');
    }

    const deletedWorkout = await editDataService.deleteWorkout(workout_id, user_id);
    res.json(deletedWorkout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   DELETE /api/split/workout/exercise/delete
// @desc    Delete exercise in a workout
// @access  Private
router.delete('/split/workout/exercise/delete', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { workout_id, exercise_id } = req.body;

    const isValidWorkoutId = await checkDatabaseService.checkWorkoutId(workout_id, user_id);
    const isValidExerciseId = await checkDatabaseService.checkExerciseId(exercise_id, user_id);
    if (isValidWorkoutId === 0 || isValidExerciseId === 0) {
      return res.status(400).send('Unathorized');
    }

    const deleteExercise = await editDataService.deleteExercise(user_id, exercise_id);
    res.json(deleteExercise.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   DELETE /api/split/workout/exercise/set/delete
// @desc    Delete set in exercise
// @access  Private
router.delete('/split/workout/exercise/set/delete', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { workout_id, exercise_id, track_id } = req.body;

    const isValidWorkoutId = await checkDatabaseService.checkWorkoutId(workout_id, user_id);
    const isValidExerciseId = await checkDatabaseService.checkExerciseId(exercise_id, user_id);
    const isValidTrackId = await checkDatabaseService.checkTrackId(exercise_id, track_id, user_id);
    if (isValidWorkoutId === 0 || isValidExerciseId === 0 || isValidTrackId === 0) {
      return res.status(400).send('Unathorized');
    }

    const deleteTrack = await editDataService.deleteTrack(exercise_id, track_id, user_id);
    res.json(deleteTrack.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/editDay
// @desc    update workout day
// @access  Private
router.post('/split/workout/editDay', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { workout_id } = req.body;

    const isValidWorkoutId = await checkDatabaseService.checkWorkoutId(workout_id, user_id);
    if (isValidWorkoutId === 0) {
      return res.status(400).send('Unathorized');
    }

    const updateWorkoutDay = await editDataService.updateWorkoutDay(workout_id);
    res.json(updateWorkoutDay.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;

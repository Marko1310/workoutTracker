const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');
const pool = require('../databse/db');

// services
const getDataService = require('../services/getDataService');
const checkDatabaseService = require('../services/checkDatabaseService');

//      RETRIEVING DATA     //
///////////////////////////////
// @route   GET /api/splits/current
// @desc    get user splits with list of workouts
// @access  Private
router.get('/splits/current', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;

    const getSplits = await getDataService.getSplits(user_id);
    res.json(getSplits.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workouts/:splitId
// @desc    get user workouts with list of exercises from the split
// @access  Private
router.get('/splits/workouts/:splitId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;

    // Get user workouts
    const getWorkouts = await getDataService.getWorkouts(user_id, split_id);
    res.json(getWorkouts.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workout/:workoutId
// @desc    get current workout
// @access  Private
router.get('/splits/workout/:workoutId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const workout_id = req.params.workoutId;

    // Get user workouts
    const getCurrentWorkout = await getDataService.getCurrentWorkout(user_id, workout_id);
    res.json(getCurrentWorkout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workout/trackData/:workoutId
// @desc    get current track data for the workout
// @access  Private
router.get('/splits/workout/trackData/:workoutId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const workout_id = req.params.workoutId;

    // Get user workouts
    const getCurrentTrackData = await getDataService.getCurrentTrackData(user_id, workout_id);
    res.json(getCurrentTrackData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/workouts/exercises/prevData/:workoutId
// @desc    get user previous workout
// @access  Private
router.get('/splits/workouts/exercises/prevData/:workoutId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const workout_id = req.params.workoutId;
    const currentWorkoutDay = await checkDatabaseService.currentWorkoutDay(workout_id);

    const getPrevTrackData = await getDataService.getPrevTrackData(currentWorkoutDay, workout_id);
    res.json(getPrevTrackData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/splits/workouts/exercises/currentData/:workoutId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const workout_id = req.params.workoutId;
    const currentWorkoutDay = await checkDatabaseService.currentWorkoutDay(workout_id);

    const getCurrentTrackData = await getDataService.getCurrentTrackData(workout_id, currentWorkoutDay);

    res.json(getCurrentTrackData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/splits/workouts/exercises/history/:exerciseId
// @desc    get history data for exercise
// @access  Private

router.post('/splits/workouts/history/:workoutId', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const workout_id = req.params.workoutId;
    const { exercise_id } = req.body;

    // Get history of track data for given exercise
    // Group by workout_day

    const track_data = await pool.query(
      "SELECT workout_day, json_agg( json_build_object('track_id', track_id, 'set', set, 'reps', reps, 'date', date, 'user_id', user_id, 'exercise_id', exercise_id, 'weight', weight, 'workout_day', workout_day, 'workout_id', workout_id) ORDER BY set) AS trackdata_history FROM track WHERE exercise_id = $1 AND workout_id = $2 GROUP BY workout_day ORDER BY workout_day DESC;",
      [exercise_id, workout_id],
    );

    res.json(track_data.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;

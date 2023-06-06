const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');

const date = new Date();

// services
const addDataService = require('../services/addDataService');
const checkDatabaseService = require('../services/checkDatabaseService');

//      ADDING DATA     //
///////////////////////////////
// @route   POST /api/splits/new
// @desc    Create new split
// @access  Private
router.post('/split/new', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { title, days } = req.body;

    if (!title) {
      return res.status(400).json({ title: 'Title field can not be empty' });
    }
    if (days === 0 || days < 1 || days > 7) {
      return res.status(400).json({ days: 'Days field should be between 1 and 7' });
    }

    const split = await addDataService.newSplit(user_id, title, days, date);
    res.json(split);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/new
// @desc    Create new workout in the workout split
// @access  Private
router.post('/split/workout/new', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { title, split_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: 'Title field can not be empty' });
    }

    const isValidSplitId = await checkDatabaseService.checkSplitId(split_id, user_id);
    if (isValidSplitId === 0) {
      return res.status(400).send('Unathorized');
    }

    const workout = await addDataService.newWorkout(user_id, title, split_id, date);
    res.json(workout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/new
// @desc    Create new exercise in the workout split
// @access  Private
router.post('/split/workout/exercise/new', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { title, goal_sets, goal_reps, workout_id } = req.body;

    if (!title) {
      return res.status(400).json({ title: 'Title field can not be empty' });
    }

    if (goal_sets < 1) {
      return res.status(400).json({ sets: 'Number of sets must be greater then 0' });
    }

    if (goal_reps < 1) {
      return res.status(400).json({ reps: 'Number of reps must be greater then 0' });
    }

    const isValidWorkoutId = await checkDatabaseService.checkWorkoutId(workout_id, user_id);
    if (isValidWorkoutId === 0) {
      return res.status(400).send('Unathorized');
    }

    const exercise = await addDataService.newExercise(user_id, title, goal_sets, goal_reps, workout_id, date);

    res.json(exercise.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/set
// @desc    Add new set to a given exercises of a certain workout
// @access  Private
router.post('/split/workout/exercise/set/new', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { exercise_id, workout_id } = req.body;

    const checkExerciseId = await checkDatabaseService.checkExerciseId(exercise_id, user_id);
    if (checkExerciseId.rows.length === 0) {
      return res.status(400).send('Unathorized');
    }

    const currentWorkoutDay = await checkDatabaseService.currentWorkoutDay(workout_id);

    const lastSet = await checkDatabaseService.lastSet(exercise_id, user_id);
    if (lastSet.rows[0].max) {
      let nextSet = lastSet.rows[0].max + 1;
      const insertSet = await addDataService.addSet(user_id, exercise_id, workout_id, date, currentWorkoutDay, nextSet);
      res.json(insertSet.rows);
    } else {
      const insertSet = await addDataService.addSet(user_id, exercise_id, workout_id, date, currentWorkoutDay);
      res.json(insertSet.rows);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   POST /api/split/workout/exercise/track
// @desc    Update new track data
// @access  Private
router.post('/split/workout/exercise/track', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const { currentTrackData } = req.body;

    const queryValues = currentTrackData.map((data) => {
      const nextDay = data.workout_day + 1;
      return [data.set, data.reps, data.weight, req.user.id, date, data.exercise_id, nextDay, data.workout_id];
    });

    const updatedRows = await addDataService.addTrackData(queryValues);

    res.json({ success: true, updatedRows: updatedRows });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;

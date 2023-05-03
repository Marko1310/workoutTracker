const express = require('express');
const router = express.Router();
const requiresAuth = require('../middleware/permission');
const pool = require('../databse/db');

//      RETRIEVING NAMES     //
///////////////////////////////
// @route   GET /api/splits/:splitId/name
// @desc    get user split name for navigation
// @access  Private
router.get('/splits/:splitId/name', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;

    const splitName = await pool.query('SELECT split_name FROM splits WHERE user_id = $1 AND split_id = $2', [
      user_id,
      split_id,
    ]);

    res.json(splitName.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/splits/:split_id/workouts/:workout_id/name
// @desc    get user split name for navigation
// @access  Private
router.get('/splits/:splitId/workouts/:workoutId/name', requiresAuth, async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;
    const workout_id = req.params.workoutId;

    const workoutName = await pool.query(
      'SELECT workout_name FROM workouts WHERE user_id = $1 AND split_id = $2 AND workout_id = $3',
      [user_id, split_id, workout_id],
    );

    res.json(workoutName.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;

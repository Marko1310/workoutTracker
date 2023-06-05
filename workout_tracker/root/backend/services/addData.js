const pool = require('../databse/db');

const newSplit = async function (user_id, title, days, date) {
  const split = await pool.query(
    'INSERT INTO splits (split_name, user_id, days, date) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, user_id, days, date],
  );
  return split;
};

const newWorkout = async function (user_id, title, split_id, date) {
  const workout = await pool.query(
    'INSERT INTO workouts (workout_name, date, split_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, date, split_id, user_id],
  );
  return workout;
};

// @route   POST /api/split/workout/exercise/new
// @desc    Create new exercise in the workout split
// @access  Private
const newExercise = async function (user_id, title, goal_sets, goal_reps, workout_id, date) {
  const exercise = await pool.query(
    'INSERT INTO exercises (exercise_name, goal_sets, goal_reps, date, workout_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, goal_sets, goal_reps, date, workout_id, user_id],
  );
  return exercise;
};

// @route   POST /api/split/workout/exercise/set
// @desc    Add new set to a given exercises of a certain workout
// @access  Private

const addSet = async function (user_id, exercise_id, workout_id, day, date) {
  const checkExerciseId = await pool.query('SELECT * FROM exercises WHERE exercise_id = $1 AND user_id = $2', [
    exercise_id,
    user_id,
  ]);

  if (checkExerciseId.rows.length === 0) {
    return res.status(400).send('Unathorized');
  }

  const currentWorkoutDay = await pool.query('SELECT day FROM workouts WHERE workout_id = $1', [workout_id]);

  const lastSet = await pool.query(
    'SELECT MAX(set) FROM track WHERE exercise_id = $1 AND user_id = $2 AND workout_day = $3;',
    [exercise_id, user_id, day],
  );

  if (lastSet.rows[0].max) {
    let nextSet = lastSet.rows[0].max + 1;
    const insertSet = await pool.query(
      'INSERT INTO track (set, weight, reps, date, exercise_id, user_id, workout_id, workout_day) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [nextSet, 0, 0, date, exercise_id, user_id, workout_id, currentWorkoutDay.rows[0].day],
    );
    res.json(insertSet.rows);
  } else {
    const insertSet = await pool.query(
      'INSERT INTO track (set, weight, reps, date, exercise_id, user_id, workout_id, workout_day) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [1, 0, 0, date, exercise_id, user_id, workout_id, currentWorkoutDay.rows[0].day],
    );
    return insertSet.rows;
  }
};

// @route   POST /api/split/workout/exercise/track
// @desc    Update new track data
// @access  Private
const addTrackData = async function (queryValues) {
  const query = format(
    'INSERT INTO track (set, reps, weight, user_id, date, exercise_id, workout_day, workout_id) VALUES %L',
    queryValues,
  );
  const updatedRows = pool.query(query);

  return updatedRows;
};

module.exports = { newSplit, newWorkout, newExercise, addSet, addTrackData };

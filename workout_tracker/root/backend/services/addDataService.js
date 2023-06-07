const pool = require('../databse/db');
const format = require('pg-format');

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

const newExercise = async function (user_id, title, goal_sets, goal_reps, workout_id, date) {
  const exercise = await pool.query(
    'INSERT INTO exercises (exercise_name, goal_sets, goal_reps, date, workout_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, goal_sets, goal_reps, date, workout_id, user_id],
  );
  return exercise;
};

const addSet = async function (user_id, exercise_id, workout_id, date, currentWorkoutDay, nextSet = 1) {
  const setToInsert = nextSet;

  const insertSet = await pool.query(
    'INSERT INTO track (set, weight, reps, date, exercise_id, user_id, workout_id, workout_day) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [setToInsert, 0, 0, date, exercise_id, user_id, workout_id, currentWorkoutDay.rows[0].day],
  );
  return insertSet;
};

const addTrackData = async function (queryValues) {
  const query = format(
    'INSERT INTO track (set, reps, weight, user_id, date, exercise_id, workout_day, workout_id) VALUES %L',
    queryValues,
  );
  const updatedRows = pool.query(query);

  return updatedRows;
};

module.exports = { newSplit, newWorkout, newExercise, addSet, addTrackData };

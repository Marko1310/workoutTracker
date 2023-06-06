const pool = require('../databse/db');

const deleteSplit = async function (split_id, user_id) {
  return await pool.query('DELETE FROM splits WHERE split_id = $1 AND user_id = $2 RETURNING *', [split_id, user_id]);
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
  const insertSet = await pool.query(
    'INSERT INTO track (set, weight, reps, date, exercise_id, user_id, workout_id, workout_day) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [nextSet, 0, 0, date, exercise_id, user_id, workout_id, currentWorkoutDay.rows[0].day],
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

module.exports = { deleteSplit };

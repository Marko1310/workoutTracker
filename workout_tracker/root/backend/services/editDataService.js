const pool = require('../databse/db');

const deleteSplit = async function (split_id, user_id) {
  return await pool.query(
    'DELETE FROM splits WHERE split_id = $1 AND user_id = $2 RETURNING *',
    [split_id, user_id]
  );
};

const deleteWorkout = async function (workout_id, user_id) {
  return pool.query(
    'DELETE FROM workouts WHERE workout_id = $1 AND user_id = $2 RETURNING *',
    [workout_id, user_id]
  );
};

const deleteExercise = async function (user_id, exercise_id) {
  return await pool.query(
    'DELETE FROM exercises WHERE exercise_id = $1 AND user_id = $2 RETURNING *',
    [exercise_id, user_id]
  );
};

const deleteTrack = async function (exercise_id, track_id, user_id) {
  return await pool.query(
    'DELETE FROM track WHERE exercise_id = $1 AND track_id = $2 AND user_id = $3 RETURNING *',
    [exercise_id, track_id, user_id]
  );
};

const updateWorkoutDay = async function (workout_id) {
  return await pool.query(
    'UPDATE workouts SET day = day + 1 WHERE workout_id = $1 RETURNING *',
    [workout_id]
  );
};

module.exports = {
  deleteSplit,
  deleteWorkout,
  deleteExercise,
  deleteTrack,
  updateWorkoutDay,
};

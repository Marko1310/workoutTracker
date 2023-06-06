const pool = require('../databse/db');

const checkExerciseId = async function (exercise_id, user_id) {
  return await pool.query('SELECT * FROM exercises WHERE exercise_id = $1 AND user_id = $2', [exercise_id, user_id]);
};

const currentWorkoutDay = async function (workout_id) {
  return await pool.query('SELECT day FROM workouts WHERE workout_id = $1', [workout_id]);
};

const lastSet = async function (exercise_id, user_id, day) {
  return await pool.query('SELECT MAX(set) FROM track WHERE exercise_id = $1 AND user_id = $2 AND workout_day = $3;', [
    exercise_id,
    user_id,
    day,
  ]);
};

const checkSplitId = async (split_id, user_id) => {
  return await pool.query('SELECT * FROM splits WHERE split_id = $1 AND user_id = $2', [split_id, user_id]);
};

const checkWorkoutId = async (workout_id, user_id) => {
  return await pool.query('SELECT * FROM workouts WHERE workout_id = $1 AND user_id = $2', [workout_id, user_id]);
};

const checkTrackId = async (exercise_id, track_id, user_id) => {
  return await pool.query('SELECT * FROM track WHERE exercise_id = $1 AND track_id = $2 AND user_id = $3', [
    exercise_id,
    track_id,
    user_id,
  ]);
};

module.exports = {
  checkExerciseId,
  currentWorkoutDay,
  lastSet,
  checkSplitId,
  checkWorkoutId,
  checkTrackId,
};

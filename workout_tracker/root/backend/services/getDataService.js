const pool = require('../databse/db');

const getSplits = async function (user_id) {
  return await pool.query(
    'SELECT s.split_id, s.split_name, s.days, s.date, array_agg(w.workout_name) FROM splits s LEFT JOIN workouts w ON w.split_id = s.split_id WHERE s.user_id = $1 GROUP BY s.split_id ORDER BY s.date',
    [user_id],
  );
};

const deleteWorkout = async function (workout_id, user_id) {
  return pool.query('DELETE FROM workouts WHERE workout_id = $1 AND user_id = $2 RETURNING *', [workout_id, user_id]);
};

const deleteExercise = async function (user_id, exercise_id) {
  return await pool.query('DELETE FROM exercises WHERE exercise_id = $1 AND user_id = $2 RETURNING *', [
    exercise_id,
    user_id,
  ]);
};

const deleteTrack = async function (exercise_id, track_id, user_id) {
  return await pool.query('DELETE FROM track WHERE exercise_id = $1 AND track_id = $2 AND user_id = $3 RETURNING *', [
    exercise_id,
    track_id,
    user_id,
  ]);
};

const updateWorkoutDay = async function (workout_id) {
  return await pool.query('UPDATE workouts SET day = day + 1 WHERE workout_id = $1 RETURNING *', [workout_id]);
};

module.exports = { getSplits };

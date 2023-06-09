const pool = require('../databse/db');

const getSplits = async function (user_id) {
  return await pool.query(
    'SELECT s.split_id, s.split_name, s.days, s.date, array_agg(w.workout_name) FROM splits s LEFT JOIN workouts w ON w.split_id = s.split_id WHERE s.user_id = $1 GROUP BY s.split_id ORDER BY s.date',
    [user_id]
  );
};

const getWorkouts = async function (user_id, split_id) {
  return await pool.query(
    'SELECT w.workout_id, w.workout_name, w.date, w.day, array_agg(e.exercise_name) FROM workouts w LEFT JOIN exercises e ON e.workout_id = w.workout_id WHERE w.user_id = $1 AND w.split_id = $2 GROUP BY w.workout_id',
    [user_id, split_id]
  );
};

const getCurrentWorkout = async function (user_id, workout_id) {
  return pool.query(
    'SELECT w.workout_id, w.workout_name, w.day FROM workouts w WHERE user_id = $1 AND workout_id = $2',
    [user_id, workout_id]
  );
};

const getCurrentTrackData = async function (workout_id, currentWorkoutDay) {
  // Get user exercises with tracking data from a given workout
  // importing track data into object to attach to every exercise
  // filter track data by workout day
  return await pool.query(
    'SELECT t.track_id, t.set, CAST(0 AS INTEGER) AS reps, t.user_id, t.exercise_id, CAST(0 AS INTEGER) AS weight, t.workout_day, t.workout_id FROM track t LEFT JOIN exercises e ON t.exercise_id = e.exercise_id AND e.workout_id = $1 WHERE t.workout_day = $2 ORDER BY t.track_id;',
    [workout_id, currentWorkoutDay.rows[0].day]
  );
};

const getPrevTrackData = async function (currentWorkoutDay, workout_id) {
  // Get user exercises with tracking data from a given workout
  // importing track data into object to attach to every exercise
  // filter track data by workout day
  return await pool.query(
    "SELECT e.exercise_id, e.exercise_name, e.goal_sets, e.goal_reps, json_agg( json_build_object('track_id', t.track_id, 'set', t.set, 'reps', t.reps, 'user_id', t.user_id, 'exercise_id', t.exercise_id, 'weight', t.weight, 'workout_day', t.workout_day, 'workout_id', t.workout_id) ORDER BY t.set) AS trackData FROM exercises e LEFT JOIN track t ON e.exercise_id = t.exercise_id AND t.workout_day = $1 WHERE e.workout_id = $2 GROUP BY e.exercise_id, e.exercise_name, e.goal_sets, e.goal_reps ORDER BY e.exercise_id;",
    [currentWorkoutDay.rows[0].day, workout_id]
  );
};

const getHistoryData = async function (exercise_id, workout_id) {
  // Get history of track data for given exercise
  // Group by workout_day
  return await pool.query(
    "SELECT workout_day, json_agg( json_build_object('track_id', track_id, 'set', set, 'reps', reps, 'date', date, 'user_id', user_id, 'exercise_id', exercise_id, 'weight', weight, 'workout_day', workout_day, 'workout_id', workout_id) ORDER BY set) AS trackdata_history FROM track WHERE exercise_id = $1 AND workout_id = $2 GROUP BY workout_day ORDER BY workout_day DESC;",
    [exercise_id, workout_id]
  );
};

module.exports = {
  getSplits,
  getWorkouts,
  getCurrentWorkout,
  getCurrentTrackData,
  getPrevTrackData,
  getHistoryData,
};

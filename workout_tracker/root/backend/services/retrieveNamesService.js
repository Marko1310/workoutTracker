const pool = require('../databse/db');

const splitName = async (user_id, split_id) => {
  return await pool.query('SELECT split_name FROM splits WHERE user_id = $1 AND split_id = $2', [user_id, split_id]);
};

const workoutName = async (user_id, split_id, workout_id) => {
  return await pool.query(
    'SELECT workout_name FROM workouts WHERE user_id = $1 AND split_id = $2 AND workout_id = $3',
    [user_id, split_id, workout_id],
  );
};

module.exports = {
  splitName,
  workoutName,
};

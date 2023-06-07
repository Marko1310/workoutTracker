//services
const retrieveNamesService = require('../services/retrieveNamesService');

const splitName = async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;

    const splitName = await retrieveNamesService.splitName(user_id, split_id);

    res.json(splitName.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const workoutName = async (req, res) => {
  try {
    user_id = req.user.id;
    const split_id = req.params.splitId;
    const workout_id = req.params.workoutId;

    const workoutName = await retrieveNamesService.workoutName(user_id, split_id, workout_id);

    res.json(workoutName.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  splitName,
  workoutName,
};

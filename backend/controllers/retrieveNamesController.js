//services
const retrieveNamesService = require('../services/retrieveNamesService');

const splitName = async (req, res) => {
  try {
    const user_id = req.user.id;
    const split_id = req.params.splitId;

    const splitNameRetrieve = await retrieveNamesService.splitName(
      user_id,
      split_id
    );

    res.json(splitNameRetrieve.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const workoutName = async (req, res) => {
  try {
    const user_id = req.user.id;
    const split_id = req.params.splitId;
    const workout_id = req.params.workoutId;

    const workoutNameRetrieve = await retrieveNamesService.workoutName(
      user_id,
      split_id,
      workout_id
    );

    res.json(workoutNameRetrieve.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  splitName,
  workoutName,
};

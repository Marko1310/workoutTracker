// services
const getDataService = require('../services/getDataService');
const checkDatabaseService = require('../services/checkDatabaseService');

const getUserSplits = async (req, res) => {
  try {
    const user_id = req.user.id;

    const getSplits = await getDataService.getSplits(user_id);
    res.json(getSplits.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getUserWorkouts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const split_id = req.params.splitId;

    // Get user workouts
    const getWorkouts = await getDataService.getWorkouts(user_id, split_id);
    res.json(getWorkouts.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getCurrentWorkout = async (req, res) => {
  try {
    const user_id = req.user.id;
    const workout_id = req.params.workoutId;

    // Get user workouts
    const currentWorkout = await getDataService.getCurrentWorkout(
      user_id,
      workout_id
    );
    res.json(currentWorkout.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getPreviousWorkout = async (req, res) => {
  try {
    const workout_id = req.params.workoutId;
    const currentWorkoutDay = await checkDatabaseService.currentWorkoutDay(
      workout_id
    );

    const getPrevTrackData = await getDataService.getPrevTrackData(
      currentWorkoutDay,
      workout_id
    );
    res.json(getPrevTrackData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getCurrentTrackData = async (req, res) => {
  try {
    const workout_id = req.params.workoutId;
    const currentWorkoutDay = await checkDatabaseService.currentWorkoutDay(
      workout_id
    );

    const currentTrackData = await getDataService.getCurrentTrackData(
      workout_id,
      currentWorkoutDay
    );

    res.json(currentTrackData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getHistoryTrackData = async (req, res) => {
  try {
    const workout_id = req.params.workoutId;
    const { exercise_id } = req.body;

    const getHistoryData = await getDataService.getHistoryData(
      exercise_id,
      workout_id
    );
    res.json(getHistoryData.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getUserSplits,
  getUserWorkouts,
  getCurrentWorkout,
  getPreviousWorkout,
  getCurrentTrackData,
  getHistoryTrackData,
};

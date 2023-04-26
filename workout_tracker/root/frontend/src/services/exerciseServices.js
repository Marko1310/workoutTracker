import api from './Api/api';

const addExercise = (title, goal_sets, goal_reps, workout_id) => {
  return api.post(`/api/auth/split/workout/exercise/new`, { title, goal_sets, goal_reps, workout_id });
};

const deleteExercise = (workout_id, exercise_id) => {
  return api.delete(`/api/auth/split/workout/exercise/delete`, {
    data: {
      workout_id,
      exercise_id,
    },
  });
};

const addNewSet = (exercise_id, workout_id, day) => {
  return api.post(`/api/auth/split/workout/exercise/set/new`, { exercise_id, workout_id, day });
};

const exererciseServices = { addExercise, deleteExercise, addNewSet };

export default exererciseServices;

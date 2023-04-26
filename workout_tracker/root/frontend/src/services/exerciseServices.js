import api from './Api/api';

const addExercise = (title, goal_sets, goal_reps, workout_id) => {
  return api.post(`/api/auth/split/workout/exercise/new`, { title, goal_sets, goal_reps, workout_id });
};

const exererciseServices = { addExercise };

export default exererciseServices;

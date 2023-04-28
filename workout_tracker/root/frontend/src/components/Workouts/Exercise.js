// React
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

// services
import exererciseServices from '../../services/exerciseServices';
import trackServices from '../../services/trackServices';

// components
import Set from './Set';
import Loading from '../Loading/Loading';
import History from './History';

// css
import './Exercise.css';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const Exercise = ({ exercise }) => {
  // global context
  const { currentWorkout } = useContext(GlobalContext);
  const { currentTrackData, setCurrentTrackData } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  const { id } = useParams();

  // add new set
  const handleNewSet = (e) => {
    e.preventDefault();
    setLoading(true);
    exererciseServices
      .addNewSet(exercise.exercise_id, id, currentWorkout.day)
      .then((data) => {
        trackServices.getPrevTrackData(id).then((data) => {
          setPrevTrackData(data);
          setLoading(false);
        });
        setCurrentTrackData((prevData) => [...prevData, data.data[0]]);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // delete set
  const handleDeleteSet = (e, workout_id, exercise_id, track_id) => {
    e.preventDefault();
    setLoading(true);

    exererciseServices
      .deleteSet(workout_id, exercise_id, track_id)
      .then((data) => {
        const newArray = currentTrackData.filter((exercise) => exercise.track_id !== data.data[0].track_id);
        setCurrentTrackData(newArray);
        trackServices.getPrevTrackData(id).then((data) => {
          setPrevTrackData(data);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // delete exercise
  const handleDeleteExercise = (e, workout_id, exercise_id) => {
    e.preventDefault();
    setLoading(true);

    if (window.confirm('By removing the exercise, you will also remove all previous data?')) {
      exererciseServices
        .deleteExercise(workout_id, exercise_id)
        .then((data) => {
          trackServices.getPrevTrackData(id).then((data) => {
            setPrevTrackData(data);
          });
          const newTrackData = currentTrackData.filter((exercise) => exercise.exercise_id !== data.data[0].exercise_id);
          setCurrentTrackData(newTrackData);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    e.stopPropagation();
  };

  // update state with weight
  const handleChangeWeight = (e, track_id) => {
    const updateWeight = currentTrackData.map((exercise) => {
      if (exercise.track_id === track_id) {
        return { ...exercise, weight: e.target.value };
      }
      return exercise;
    });
    setCurrentTrackData(updateWeight);
  };

  // update state with reps
  const handleChangeReps = (e, track_id) => {
    const updateReps = currentTrackData.map((exercise) => {
      if (exercise.track_id === track_id) {
        return { ...exercise, reps: e.target.value };
      }
      return exercise;
    });
    setCurrentTrackData(updateReps);
  };

  // if no data -> don't render empty list item
  const isTrackEmpty = exercise.trackdata[0].track_id === null;

  // disable deleting sets in between, only last one
  let lastSet = 0;
  exercise.trackdata.map((exercise) => {
    if (exercise.set > lastSet) lastSet = exercise.set;
  });

  return loading ? (
    <Loading />
  ) : (
    <div className="exercise-container">
      <div className="title-container">
        <p className="exercise-title">
          {exercise.exercise_name} ({exercise.goal_sets} x {exercise.goal_reps})
        </p>
        <p onClick={(e) => handleDeleteExercise(e, id, exercise.exercise_id)} className="delete-exercise">
          Delete
        </p>
      </div>
      <div className="exercise-navbar">
        <p className="exercise-navbar-title">Set</p>
        <p className="exercise-navbar-title">Previous</p>
        <p className="exercise-navbar-title">kg</p>
        <p className="exercise-navbar-title">Reps</p>
      </div>
      {!isTrackEmpty &&
        exercise.trackdata.map((trackdata) => {
          return (
            <Set
              key={trackdata.track_id}
              prevTrackdata={trackdata}
              currentTrackData={currentTrackData?.filter((data) => data.track_id === trackdata.track_id)}
              exercise={exercise}
              handleChangeReps={handleChangeReps}
              handleChangeWeight={handleChangeWeight}
              handleDeleteSet={handleDeleteSet}
              lastSet={lastSet}
              id={id}
            />
          );
        })}
      <History workout_id={id} exercise_id={exercise.exercise_id} exercise_name={exercise.exercise_name} />

      <button onClick={(e) => handleNewSet(e)} className="addSetBtn">
        + Add Set
      </button>
    </div>
  );
};

export default Exercise;

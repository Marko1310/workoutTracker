// React
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import exererciseServices from '../../services/exerciseServices';
import trackServices from '../../services/trackServices';

// components
import Set from './Set';
import Loading from '../Loading/Loading';
import EditMenu from './EditMenu';

// css
import './Exercise.css';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const Exercise = ({ exercise, setIsHistoryWindowOpen, isHistoryWindowOpen, currentExercise, setCurrentExercise }) => {
  // global context
  const { currentWorkout } = useContext(GlobalContext);
  const { currentTrackData, setCurrentTrackData } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

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
    setIsEditMenuOpen(false);
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
    } else {
      setLoading(false);
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

  const handleHistoryOpen = (exercise) => {
    setIsEditMenuOpen(false);
    setCurrentExercise(exercise);
    setIsHistoryWindowOpen(true);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="exercise-container">
      <EditMenu
        isEditMenuOpen={isEditMenuOpen}
        setIsEditMenuOpen={setIsEditMenuOpen}
        handleDeleteExercise={handleDeleteExercise}
        id={id}
        exercise_id={exercise.exercise_id}
        exercise={exercise}
        handleHistoryOpen={handleHistoryOpen}
      />
      <div className="title-container">
        <p className="exercise-title">
          {exercise.exercise_name} ({exercise.goal_sets} x {exercise.goal_reps})
        </p>
        <p onClick={(e) => setIsEditMenuOpen(true)} className="delete-exercise">
          <FontAwesomeIcon icon={faEllipsis} style={{ color: '#000000', fontSize: '1.2rem' }} className="menu-bar" />
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

      <button onClick={(e) => handleNewSet(e)} className="addSetBtn">
        + Add Set
      </button>
    </div>
  );
};

export default Exercise;

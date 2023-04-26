// React
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

// services
import exererciseServices from '../../services/exerciseServices';
import trackServices from '../../services/trackServices';

// components
import Set from './Set';

// css
import './Exercise.css';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const Exercise = ({ exercise }) => {
  // global context
  const { setLoading } = useContext(GlobalContext);
  const { currentWorkout } = useContext(GlobalContext);
  const { currentTrackData, setCurrentTrackData } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);

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

    if (window.confirm('By removing the exercise, you will also remove all previous data?')) {
      exererciseServices
        .deleteExercise(workout_id, exercise_id)
        .then((data) => {
          trackServices.getPrevTrackData(id).then((data) => {
            setPrevTrackData(data);
          });
          const newTrackData = currentTrackData.filter((exercise) => exercise.exercise_id !== data.data[0].exercise_id);
          setCurrentTrackData(newTrackData);
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

  return (
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
              trackdata={trackdata}
              exercise={exercise}
              handleChangeReps={handleChangeReps}
              handleChangeWeight={handleChangeWeight}
              handleDeleteSet={handleDeleteSet}
              lastSet={lastSet}
              id={id}
            />

            // <div parent-id={track.exercise_id} key={track.track_id} className="exercise">
            //   <p className="set">{track.set}</p>
            //   <p className="previous">
            //     {track.weight} kg x {track.reps}
            //   </p>
            //   <input
            //     onChange={(e) => {
            //       handleChangeWeight(e, track.track_id);
            //     }}
            //     className="exercise-forms"
            //     type="number"
            //     id="kg"
            //     name="kg"
            //     placeholder="kg"
            //   ></input>
            //   <input
            //     onChange={(e) => handleChangeReps(e, track.track_id)}
            //     className="exercise-forms"
            //     type="number"
            //     id="reps"
            //     name="reps"
            //     placeholder="reps"
            //   ></input>
            //   {lastSet === track.set && (
            //     <p
            //       onClick={(e) => {
            //         handleDeleteSet(e, id, exercise.exercise_id, track.track_id);
            //       }}
            //       className="delete-set"
            //     >
            //       x
            //     </p>
            //   )}
            // </div>
          );
        })}
      <button onClick={(e) => handleNewSet(e)} className="addSetBtn">
        + Add Set
      </button>
    </div>
  );
};

export default Exercise;

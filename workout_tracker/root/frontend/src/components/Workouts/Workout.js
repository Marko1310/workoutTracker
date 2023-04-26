// React
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// services
import workoutServices from '../../services/workoutServices';

// Components
import Exercise from './Exercise';
import NewExerciseModal from './NewExerciseModal';
import Message from './Message';
import Timer from '../Timer/Timer';

// css
import './Workout.css';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const WorkoutSplit = () => {
  const { isModalOpen, setIsModalOpen, isMenuOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { prevTrackData } = useContext(GlobalContext);
  const { setError } = useContext(GlobalContext);
  const { currentWorkout, setCurrentWorkout } = useContext(GlobalContext);
  const { addTrackData } = useContext(GlobalContext);
  const { updateWorkoutDay } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { getCurrentTrackData } = useContext(GlobalContext);
  const { setCurrentTrackData } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);

  // state
  const [sucessMsg, setSuccessMsg] = useState(null);

  // Extract workout_id
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      // get current workout
      workoutServices.getCurrentWorkout(id).then((data) => {
        setCurrentWorkout(data);
        setLoading(false);
      });

      // get current track data
      workoutServices.getCurrentTrackData(id).then((data) => {
        setCurrentTrackData(data);
        setLoading(false);
      });

      // get previous track data
      workoutServices.getPrevTrackData(id).then((data) => {
        setPrevTrackData(data);
        setLoading(false);
      });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addTrackData(id)
      .then((response) => {
        if (response) {
          setSuccessMsg('success');
          setIsModalOpen(true);
          success();
          updateWorkoutDay(id);
        }
      })
      .catch(() => {
        setSuccessMsg('error');
        success();
      });
  };

  const handleModal = () => {
    setError('');
    setIsModalOpen((setIsModalOpen) => !setIsModalOpen);
  };

  const success = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="workout-main-container">
      <div className={`workout ${isModalOpen || isMenuOpen ? 'blurred' : ''}`}>
        <div className="container">
          <div className="description-container">
            <p>{currentWorkout.workout_name}</p>
            <p>{`Workout #${currentWorkout.day}`}</p>
            <Timer />
            {/* <div>Notes</div> */}
          </div>
          {prevTrackData.map((el) => {
            return <Exercise key={el.exercise_id} el={el} />;
          })}
          <div className="button-container">
            <button onClick={() => handleModal()} disabled={isModalOpen} className="workoutBtn add">
              Add exercise
            </button>
            <button disabled={isModalOpen} onClick={(e) => handleSubmit(e)} className="workoutBtn">
              Save workout
            </button>
          </div>
        </div>
      </div>
      <Message successMsg={sucessMsg} />
      <NewExerciseModal successMsg={sucessMsg} />
    </div>
  );
};

export default WorkoutSplit;

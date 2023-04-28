// React
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// services
import workoutServices from '../../services/workoutServices';
import trackServices from '../../services/trackServices';

// Components
import Exercise from './Exercise';
import NewExerciseModal from './NewExerciseModal';
import Message from './Message';
import Timer from '../Timer/Timer';
import Loading from '../Loading/Loading';
import History from './History';

// css
import './Workout.css';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const WorkoutSplit = () => {
  // global context
  const { user } = useContext(GlobalContext);
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);
  const { isMenuOpen } = useContext(GlobalContext);
  const { prevTrackData, setPrevTrackData } = useContext(GlobalContext);
  const { setError } = useContext(GlobalContext);
  const { currentWorkout, setCurrentWorkout } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);
  const { currentTrackData, setCurrentTrackData } = useContext(GlobalContext);

  // state
  const [sucessMsg, setSuccessMsg] = useState(null);
  const [isHistoryWindowOpen, setIsHistoryWindowOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState('');

  // Extract workout_id
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      setLoading(true);
      // 1. get current workout
      // 2. get new track data
      // 3. get previous track data

      // get current workout
      workoutServices.getCurrentWorkout(id).then((data) => {
        setCurrentWorkout(data);
        // setLoading(false);
      });

      // get current track data
      trackServices.getCurrentTrackData(id).then((data) => {
        setCurrentTrackData(data);
      });

      // get previous track data
      trackServices.getPrevTrackData(id).then((data) => {
        setPrevTrackData(data);
        setLoading(false);
      });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTrackData?.length === 0) {
      navigate('/splits');
    } else {
      trackServices
        .addTrackData(id, currentTrackData)
        .then((data) => {
          setPrevTrackData(data);
          setSuccessMsg('success');
          setIsModalOpen(true);
          success();
          workoutServices.updateWorkoutDay(id);
        })
        .catch(() => {
          setSuccessMsg('error');
          success();
        });
    }
  };

  const handleModal = () => {
    setError('');
    setIsModalOpen((setIsModalOpen) => !setIsModalOpen);
  };

  const success = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      navigate('/splits');
    }, 2000);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="app-main-container">
      <div className="workout-main-container">
        <div className={`workout ${isModalOpen || isMenuOpen || isHistoryWindowOpen ? 'blurred' : ''}`}>
          <div className="container">
            <div className="description-container">
              <p>{currentWorkout.workout_name}</p>
              <p className="workout-day">{`Workout #${currentWorkout.day + 1}`}</p>
              <Timer />
              {/* <div>Notes</div> */}
            </div>
            {prevTrackData.map((el) => {
              return (
                <Exercise
                  key={el.exercise_id}
                  exercise={el}
                  isHistoryWindowOpen={isHistoryWindowOpen}
                  setIsHistoryWindowOpen={setIsHistoryWindowOpen}
                  currentExercise={currentExercise}
                  setCurrentExercise={setCurrentExercise}
                />
              );
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
        <History
          workout_id={id}
          exercise_id={currentExercise.exercise_id}
          exercise_name={currentExercise.exercise_name}
          isHistoryWindowOpen={isHistoryWindowOpen}
          setIsHistoryWindowOpen={setIsHistoryWindowOpen}
        />
      </div>
    </div>
  );
};

export default WorkoutSplit;

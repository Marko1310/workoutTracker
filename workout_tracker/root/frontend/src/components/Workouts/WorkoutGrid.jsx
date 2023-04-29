// React
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// services
import workoutServices from '../../services/workoutServices.js';

// Components
import NewWorkoutModal from './NewWorkoutModal.jsx';
import AddWorkoutBtn from './AddWorkoutBtn.jsx';
import HelpModal from '../HelpModal/HelpModal.jsx';
import Loading from '../Loading/Loading.jsx';

// Context
import { GlobalContext } from '../../context/GlobalContext.jsx';

// css
import './WorkoutGrid.css';

// Image
import logo from '../../images/workout.png';

const WorkoutGrid = () => {
  const { isModalOpen, isMenuOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { workouts, setWorkouts } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  // state
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const navigate = useNavigate();

  // extract split_id
  const { split_id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      navigate('/');
      return;
    }
    workoutServices.getWorkouts(split_id).then((data) => {
      setWorkouts(data);
      setLoadingWorkouts(false);
    });
  }, [navigate, setLoading, setWorkouts, split_id, user]);

  useEffect(() => {
    if (!loadingWorkouts && workouts.length === 0) {
      setHelpModalOpen(true);
    } else if (!loadingWorkouts && workouts.length !== 0) {
      setHelpModalOpen(false);
    }
    setLoading(false);
  }, [workouts, loadingWorkouts]);

  // When card clicked -> change route:
  const changeRoute = function (workout_id) {
    navigate(`/workout/${workout_id}`);
  };

  // Delete workout
  const handleDelete = (e, split_id, workout_id) => {
    e.preventDefault();
    setLoading(true);

    if (window.confirm('Are you sure you want to delete this Workout?')) {
      workoutServices.deleteWorkout(split_id, workout_id).then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
    }
    e.stopPropagation();
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="app-main-container">
      {helpModalOpen ? (
        <HelpModal message={'workouts'} />
      ) : (
        <div className="workoutGrid-main-container">
          <div className={`${isModalOpen || isMenuOpen ? 'blurred' : ''}`}>
            <p className="choose-title">Choose a Workout:</p>
            <div className="exercise-grid">
              {workouts.map((el) => {
                return (
                  <ul key={el.workout_id} className="exercise-list-container">
                    <div className="image-and-delete-container-workout">
                      <img className="exercise-image" src={logo} alt="exercise"></img>
                      <p onClick={(e) => handleDelete(e, split_id, el.workout_id)} className="delete-split">
                        Delete
                      </p>
                    </div>
                    <div className="exercise-card">
                      <li className="exercise-card-title">{el.workout_name} workout</li>
                      <p>Exercises: </p>
                      {el.array_agg.map((name, index) => {
                        return (
                          <li key={index}>
                            - Exercise {index + 1} : {name}
                          </li>
                        );
                      })}
                    </div>
                    <button className="enter-workout" onClick={() => changeRoute(el.workout_id)}>
                      Choose Workout
                    </button>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="new-workout-add-container">
        <NewWorkoutModal />
        <AddWorkoutBtn />
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="workoutGrid-main-container">
  //       <div className={`${isModalOpen ? 'blurred' : ''}`}>
  //         <p className="choose">Choose a Workout</p>
  //         <div className="exercise-grid">
  //           {workouts.map((el) => {
  //             return (
  //               <ul key={el.workout_id} onClick={() => changeRoute(el.workout_id)} className="exercise-list-container">
  //                 <div className="image-and-delete-container-workout">
  //                   <img className="exercise-image" src={logo} alt="exercise"></img>
  //                   <button onClick={(e) => handleDelete(e, split_id, el.workout_id)} className="delete-split">
  //                     Delete
  //                   </button>
  //                 </div>

  //                 <div className="exercise-card">
  //                   <li className="exercise-card-title">{el.workout_name}</li>
  //                   <p>Exercises: </p>
  //                   {el.array_agg.map((name) => {
  //                     return <li> - {name}</li>;
  //                   })}
  //                   <li>--------------------------------</li>
  //                   <li>Date created: {el.date.slice(0, 10)}</li>
  //                 </div>
  //               </ul>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="new-workout-add-container">
  //       <NewWorkoutModal />
  //       <AddWorkoutBtn />
  //     </div>
  //   </>
  // );
};

export default WorkoutGrid;

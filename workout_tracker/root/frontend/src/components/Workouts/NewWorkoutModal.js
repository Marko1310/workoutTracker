// React
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import workoutServices from '../../services/workoutServices.js';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// css
import './NewWorkoutModal.css';

const NewWorkoutModal = () => {
  // component state
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  // Context
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { setWorkouts } = useContext(GlobalContext);

  // extract split_id
  const { split_id } = useParams();

  const handleNewWorkout = (e) => {
    e.preventDefault();
    if (title) {
      setLoading(true);
    }
    workoutServices
      .addWorkout(title, split_id)
      .then((data) => {
        setWorkouts(data);
        setIsModalOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };
  return (
    <div className={`newWorkout-container ${isModalOpen ? 'show' : ''}`}>
      <p className="newWorkout-title">Add new workout</p>
      <form onSubmit={(e) => handleNewWorkout(e)}>
        <label htmlFor="newWorkout-title">Title of the workout</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push day"
        ></input>
        {error.title ? <p className="error">{error.title}</p> : ''}

        <div className="button-container">
          <button className="button">Add workout</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
            className="button dismiss"
          >
            Dismiss
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkoutModal;

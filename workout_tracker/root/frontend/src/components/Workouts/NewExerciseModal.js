// React
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import exererciseServices from '../../services/exerciseServices';
import trackServices from '../../services/trackServices';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// css
import './NewExerciseModal.css';

const NewExerciseModal = ({ successMsg }) => {
  // global context
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { error, setError } = useContext(GlobalContext);
  const { setPrevTrackData } = useContext(GlobalContext);

  // component state
  const [title, setTitle] = useState('');
  const [goal_sets, setGoal_sets] = useState(0);
  const [goal_reps, setGoal_reps] = useState(0);

  // extract workout_id
  const { id } = useParams();

  const handleNewExercise = (e) => {
    e.preventDefault();
    if (title && goal_sets && goal_reps) {
      setLoading(true);
    }
    exererciseServices
      .addExercise(title, goal_sets, goal_reps, id)
      .then(() => {
        setIsModalOpen(false);
        trackServices.getPrevTrackData(id).then((data) => {
          setPrevTrackData(data);
          setLoading(false);
        });
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={`newExercise-container ${isModalOpen && !successMsg ? 'show' : ''}`}>
      <p className="newExercise-title">Add new exercise</p>
      <form onSubmit={(e) => handleNewExercise(e)}>
        <label htmlFor="title">Title of the exercise</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Bench Press"
        ></input>
        {error.title ? <p className="error">{error.title}</p> : ''}

        <label htmlFor="sets">Number of goal sets</label>
        <input
          onChange={(e) => setGoal_sets(e.target.value)}
          className="forms"
          type="number"
          id="sets"
          name="sets"
          placeholder="e.g. 4"
        ></input>
        {error.sets ? <p className="error">{error.sets}</p> : ''}

        <label htmlFor="reps">Number of goal reps</label>
        <input
          onChange={(e) => setGoal_reps(e.target.value)}
          className="forms"
          type="number"
          id="reps"
          name="reps"
          placeholder="e.g. 12"
        ></input>
        {error.reps ? <p className="error">{error.reps}</p> : ''}

        <div className="button-container">
          <button className="button">Add exercise</button>
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

export default NewExerciseModal;

// React
import React, { useContext, useState } from 'react';

// services
import splitServices from '../../services/splitServices';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// css
import './NewSplitModal.css';

const NewWorkoutSplit = () => {
  // component state
  const [title, setTitle] = useState('');
  const [days, setDays] = useState('');
  const [error, setError] = useState('');

  // global Context
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { setSplits } = useContext(GlobalContext);

  const handleNewSplit = (e) => {
    e.preventDefault();
    if (title && days) {
      setLoading(true);
    }
    splitServices
      .addSplit(title, days)
      .then((data) => {
        setSplits(data);
        setIsModalOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className={`newSplit-container + ${isModalOpen ? 'show' : ''}`}>
      <p className="newSplit-title">Create new workout split</p>
      <form onSubmit={(e) => handleNewSplit(e)}>
        <label className="label-title" htmlFor="title">
          Title of the split
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="newSplit-forms"
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Push/Pull/Legs"
        ></input>
        {error.title ? <p className="error">{error.title}</p> : ''}

        <label className="label-title" htmlFor="days">
          Number of days in a week
        </label>

        <select onChange={(e) => setDays(e.target.value)} className="newSplit-forms">
          <option name=""></option>
          <option name="1">1</option>
          <option name="2">2</option>
          <option name="3">3</option>
          <option name="4">4</option>
          <option name="5">5</option>
          <option name="6">6</option>
          <option name="7">7</option>
        </select>
        {error.days ? <p className="error">{error.days}</p> : ''}

        <div className="button-container">
          <button type="submit" className="button">
            Create workout split
          </button>
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

export default NewWorkoutSplit;

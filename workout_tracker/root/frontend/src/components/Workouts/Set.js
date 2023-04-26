// React
import React, { useContext, useEffect, useState } from 'react';

// Context
// import { GlobalContext } from '../../context/GlobalContext.js';

// css
import './Set.css';

const Set = ({
  prevTrackdata,
  currentTrackData,
  exercise,
  handleChangeReps,
  handleChangeWeight,
  handleDeleteSet,
  lastSet,
  id,
}) => {
  // const { currentTrackData } = useContext(GlobalContext);

  // state
  const [prevNumbers, setPrevNumbers] = useState();
  const [currentNumbers, setCurrentNumbers] = useState();
  const [isPR, setIsPR] = useState(false);

  useEffect(() => {
    setPrevNumbers(prevTrackdata.reps * prevTrackdata.weight);

    if (currentTrackData.length !== 0) {
      setCurrentNumbers(currentTrackData[0].reps * currentTrackData[0].weight);
    }
  }, [handleChangeWeight, handleChangeReps, prevTrackdata, currentTrackData]);

  useEffect(() => {
    if (currentNumbers > prevNumbers) {
      setIsPR(true);
    } else {
      setIsPR(false);
    }
  }, [currentNumbers, prevNumbers]);

  return (
    <div
      parent-id={prevTrackdata.exercise_id}
      key={prevTrackdata.track_id}
      className={`exercise ${isPR ? 'green' : ''}`}
    >
      <p className="set">{prevTrackdata.set}</p>
      {isPR && <p className="pr">PR!</p>}
      <p className="previous">
        {prevTrackdata.weight} kg x {prevTrackdata.reps}
      </p>
      <input
        onChange={(e) => {
          handleChangeWeight(e, prevTrackdata.track_id);
        }}
        className="exercise-forms"
        type="number"
        id="kg"
        name="kg"
        placeholder="kg"
      ></input>
      <input
        onChange={(e) => handleChangeReps(e, prevTrackdata.track_id)}
        className="exercise-forms"
        type="number"
        id="reps"
        name="reps"
        placeholder="reps"
      ></input>
      {lastSet === prevTrackdata.set && (
        <p
          onClick={(e) => {
            handleDeleteSet(e, id, exercise.exercise_id, prevTrackdata.track_id);
          }}
          className="delete-set"
        >
          x
        </p>
      )}
    </div>
  );
};

export default Set;

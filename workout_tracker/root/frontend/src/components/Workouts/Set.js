// React
import React, { useContext, useEffect, useState } from 'react';

// Context
import { GlobalContext } from '../../context/GlobalContext.js';

// css
import './Set.css';

const Set = ({ trackdata, exercise, handleChangeReps, handleChangeWeight, handleDeleteSet, lastSet, id }) => {
  const { currentTrackData } = useContext(GlobalContext);

  // state
  const [prevNumbers, setPrevNumbers] = useState();
  const [currentNumbers, setCurrentNumbers] = useState();
  const [isPR, setIsPR] = useState(false);

  useEffect(() => {
    const tempArray = currentTrackData.filter((data) => {
      return data.track_id === trackdata.track_id;
    });
    setCurrentNumbers(tempArray[0].reps * tempArray[0].weight);
  }, [handleChangeWeight, handleChangeReps]);

  useEffect(() => {
    const tempArray = currentTrackData.filter((data) => {
      return data.track_id === trackdata.track_id;
    });
    // console.log(tempArray);
    setPrevNumbers(trackdata.reps * trackdata.weight);
    console.log(currentNumbers, prevNumbers);
    if (currentNumbers > prevNumbers) {
      console.log('aaa');
      setIsPR(true);
    } else {
      setIsPR(false);
    }
    console.log(prevNumbers);
    console.log(currentNumbers);
  }, [currentNumbers]);

  // useEffect(() => {
  //   // console.log(prevArray[0]);
  //   // if (prevArray[0].reps * prevArray[0].weight > trackdata.reps * trackdata.weight) {
  //   //   console.log('aaaa');
  //   // }
  // }, [handleChangeReps, handleChangeWeight]);

  return (
    <div parent-id={trackdata.exercise_id} key={trackdata.track_id} className={`exercise ${isPR ? 'green' : ''}`}>
      <p className="set">{trackdata.set}</p>
      <p className="previous">
        {trackdata.weight} kg x {trackdata.reps}
      </p>
      <input
        onChange={(e) => {
          handleChangeWeight(e, trackdata.track_id);
        }}
        className="exercise-forms"
        type="number"
        id="kg"
        name="kg"
        placeholder="kg"
      ></input>
      <input
        onChange={(e) => handleChangeReps(e, trackdata.track_id)}
        className="exercise-forms"
        type="number"
        id="reps"
        name="reps"
        placeholder="reps"
      ></input>
      {lastSet === trackdata.set && (
        <p
          onClick={(e) => {
            handleDeleteSet(e, id, exercise.exercise_id, trackdata.track_id);
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

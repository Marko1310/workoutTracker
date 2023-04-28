// React
import { useEffect, useState } from 'react';

// services
import trackServices from '../../services/trackServices';

// css
import './History.css';

const History = ({ workout_id, exercise_id, exercise_name, isHistoryWindowOpen }) => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    trackServices.getHistoryTrackData(workout_id, exercise_id).then((data) => {
      setHistoryData(data.data.slice(0, -1));
    });
  }, [exercise_id, workout_id]);

  return (
    historyData.length > 0 &&
    isHistoryWindowOpen && (
      <div className="history-container">
        <p className="history-exercise-title">{exercise_name}</p>
        {historyData.map((el) => {
          return (
            <div className="history-data-container">
              <div className="history-dayDate-container">
                <p className="history-day">Workout #{el.workout_day}</p>
                <p className="history-date">Date: {el.trackdata_history[0].date.slice(0, 10)}</p>
              </div>
              <div className="history-setRepWeight-container">
                <p className="history-set">Set</p>
                <p className="history-weight">kg</p>
                <p className="history-rep">Reps</p>
              </div>
              {el.trackdata_history.map((data) => {
                return (
                  <div key={data.track_id} className="history-setRepWeight-container">
                    <p className="history-set-data">{data.set}</p>
                    <p className="history-weight-data">{data.weight}</p>
                    <p className="history-rep-data">{data.reps}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    )
  );
};

export default History;

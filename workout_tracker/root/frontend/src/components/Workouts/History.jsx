// React
import { useEffect, useState } from 'react';

// services
import trackServices from '../../services/trackServices';

// components
import Loading from '../Loading/Loading';

// css
import './History.css';

const History = ({ workout_id, exercise_id, exercise_name, isHistoryWindowOpen, setIsHistoryWindowOpen }) => {
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    setHistoryLoading(true);
    trackServices.getHistoryTrackData(workout_id, exercise_id).then((data) => {
      setHistoryData(data.data.slice(0, -1));
      setHistoryLoading(false);
    });
  }, [exercise_id, workout_id]);

  return (
    isHistoryWindowOpen &&
    !historyLoading && (
      <div className="history-container">
        <div className="history-title-container">
          <p className="history-exercise-title">{exercise_name}</p>
          <p className="history-close" onClick={() => setIsHistoryWindowOpen(false)}>
            x
          </p>
        </div>
        {historyData.length === 0 ? (
          <p>No previous data</p>
        ) : (
          historyData.map((el, index) => {
            return (
              <div key={index} className="history-data-container">
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
          })
        )}
      </div>
    )
  );
};

export default History;

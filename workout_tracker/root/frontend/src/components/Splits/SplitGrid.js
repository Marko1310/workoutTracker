// React
import React, { useContext, useEffect, useState } from 'react';

// services
import splitServices from '../../services/splitServices';

// Components
import AddSplitBtn from './AddSplitBtn';
import NewSplit from './NewSplitModal.js';
import HelpModal from '../HelpModal/HelpModal';

// Components
import { useNavigate } from 'react-router-dom';

import Loading from '../Loading/Loading';

// Context
import { GlobalContext } from '../../context/GlobalContext.js';

// css
import './SplitGrid.css';

// image
import calendar from '../../images/calendar.png';

const WorkoutSplitGrid = () => {
  const { isModalOpen, isMenuOpen, loading } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const { splits, setSplits } = useContext(GlobalContext);
  const { getWorkouts } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);

  // state
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    splitServices.getSplits().then((data) => {
      setSplits(data);
      setLoading(false);
    });
  }, [user, navigate, setLoading, setSplits]);

  useEffect(() => {
    if (splits.length === 0) {
      setHelpModalOpen(true);
    } else setHelpModalOpen(false);
    setLoading(false);
  }, [splits, setLoading]);

  const changeRoute = (id) => {
    getWorkouts(id);
    setLoading(true);
    navigate(`/workouts/${id}`);
  };

  const handleDelete = (e, split_id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this Workout Split?')) {
      setLoading(true);
      splitServices.deleteSplit(split_id).then((data) => {
        setSplits(data);
        setLoading(false);
      });
    }
    e.stopPropagation();
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <p className="choose-title">Choose your Workout Split:</p>
      {!loading && helpModalOpen && <HelpModal message={'splits'} />}
      <div className="main-container">
        <div className={`${isModalOpen || isMenuOpen ? 'blurred' : ''}`}>
          <div className="workout-grid">
            {splits.length > 0 &&
              splits.map((el) => {
                return (
                  <ul key={el.split_id} className="workout-container">
                    <div className="image-and-delete-container">
                      <img className="workout-image" src={calendar} alt="Workout"></img>
                      <p onClick={(e) => handleDelete(e, el.split_id)} className="delete-split">
                        Delete
                      </p>
                    </div>
                    <div className="workout-card">
                      <li className="workout-card-title">{el.split_name} workout</li>
                      <li className="workout-card-workouts-days">{el.days} day split:</li>
                      {el.array_agg.map((name, index) => {
                        return (
                          <li key={index} className="workout-card-workouts">
                            - Day {index + 1} : {name} day
                          </li>
                        );
                      })}
                    </div>
                    <button className="enter-split" onClick={() => changeRoute(el.split_id)}>
                      Choose Split
                    </button>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
      <div className="new-split-add-container">
        <NewSplit />
        <AddSplitBtn />
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="main-container">
  //       <div className={`${isModalOpen ? 'blurred' : ''}`}>
  //         <p className="choose">Choose a Workout Split</p>
  //         <div className="workout-grid">
  //           {splits.length > 0 &&
  //             splits.map((el) => {
  //               return (
  //                 <ul
  //                   key={el.split_id}
  //                   onClick={isModalOpen ? null : () => changeRoute(el.split_id)}
  //                   className="workout-container"
  //                 >
  //                   <div className="image-and-delete-container">
  //                     <img className="workout-image" src={calendar} alt="Workout"></img>
  //                     <button onClick={(e) => handleDelete(e, el.split_id)} className="delete-split">
  //                       Delete
  //                     </button>
  //                   </div>
  //                   <div className="workout-card">
  //                     <li className="workout-card-title">{el.split_name}</li>
  //                     <li>{el.days} day split:</li>
  //                     {el.array_agg.map((name) => {
  //                       return <li> - {name} day</li>;
  //                     })}
  //                     <li>--------------------------------</li>
  //                     <li>Created on: {el.date.slice(0, 10)}</li>
  //                   </div>
  //                 </ul>
  //               );
  //             })}
  //         </div>
  //       </div>
  //     </div>
  //     <div className="new-split-add-container">
  //       <NewSplit />
  //       <AddSplitBtn />
  //     </div>
  //   </>
  // );
};

export default WorkoutSplitGrid;

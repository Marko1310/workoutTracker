// React
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

// css
import './index.css';

// Components
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Workout from './components/Workouts/Workout';
import SplitGrid from './components/Splits/SplitGrid';
import WorkoutGrid from './components/Workouts/WorkoutGrid';
import NotFound from './components/NotFound/NotFound';

// Context
import { GlobalContext } from './context/GlobalContext';

function App() {
  const { loading, setIsModalOpen, setIsMenuOpen } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(false);
    setIsMenuOpen(false);
  }, [user, navigate]);

  return (
    <div className="App">
      <div className="content">
        {user && <Navigation />}
        {loading ? (
          <div className="loading">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            <h2 className="loading-title">Loading</h2>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<SplitGrid />} />
            <Route path="workouts/:split_id" element={<WorkoutGrid />} />
            <Route path="workout/:id" element={<Workout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;

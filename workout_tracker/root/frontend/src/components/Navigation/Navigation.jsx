//React
import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// services
import userServices from '../../services/userServices';
import navigationServices from '../../services/navigationServices';

// components
import Popmenu from './Popmenu';

//css
import './Navigation.css';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  // global Context
  const { user, setUser } = useContext(GlobalContext);
  const { setLoading } = useContext(GlobalContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(GlobalContext);

  // current location
  const location = useLocation();

  // component state
  const [navigationTitle, setNavigationTitle] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path.length === 2 && path[1] === 'splits') {
      setNavigationTitle('Workout Splits');
    } else if (path.length === 4 && path[1] === 'splits') {
      const splitId = path[2];
      navigationServices.getSplitName(splitId).then((data) => {
        setNavigationTitle(data.split_name);
      });
    } else if (path.length === 5 && path[1] === 'splits' && path[3] === 'workouts') {
      const splitId = path[2];
      const workoutId = path[4];
      navigationServices.getWorkoutName(splitId, workoutId).then((data) => {
        setNavigationTitle(data.workout_name);
      });
    }
  }, [location]);

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    setLoading(true);
    userServices
      .logout()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="navigation-container">
      <div className="navigation">{navigationTitle}</div>
      <div className="user-links">
        <p className="navigation-user">{user.email}</p>
        <div className="links">
          <NavLink to="/splits">Home</NavLink>
          <NavLink onClick={(e) => handleLogout(e)} to="/">
            Logout
          </NavLink>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        style={{ color: '#ffffff', fontSize: '1.5rem' }}
        className="menu-bar"
        onClick={() => setIsMenuOpen(true)}
      />
      <Popmenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleLogout={handleLogout} />
    </div>
  );
};

export default Navigation;

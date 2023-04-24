//React
import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// components
import Popmenu from './Popmenu';

//css
import './Navigation.css';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Context
import { GlobalContext } from '../../context/GlobalContext';

const Navigation = () => {
  // Context
  const { user } = useContext(GlobalContext);
  const { logout } = useContext(GlobalContext);
  const { setLoadingTimeout } = useContext(GlobalContext);

  // current location
  const location = useLocation();
  const currentRoute = location.pathname;

  // state
  const [navigationTitle, setNavigationTitle] = useState('');
  // const [menuOpen, setMenuOpen] = useState(false);
  const { isMenuOpen, setIsMenuOpen } = useContext(GlobalContext);

  useEffect(() => {
    if (currentRoute.includes('dashboard')) setNavigationTitle('Dashboard');
    else if (currentRoute.includes('workouts')) setNavigationTitle('Workouts');
    else if (currentRoute.includes('workout')) setNavigationTitle('Workout');
  }, [currentRoute]);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoadingTimeout();
    logout();
  };

  return (
    <div className="navigation-container">
      <div className="navigation">{navigationTitle}</div>
      <div className="user-links">
        <p className="navigation-user">{user.email}</p>
        <div className="links">
          <NavLink to="/dashboard">Home</NavLink>
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

  // return (
  //   <div className="navigation-container">
  //     <div className="user">
  //       <img className="navigation-logo" src={logo} alt="Logo" />
  //       {user && <div className="navigation-user">Hello {user.name}</div>}
  //     </div>
  //     {user && (
  //       <div className="links">
  //         <NavLink to="/dashboard">Home</NavLink>
  //         <NavLink onClick={(e) => handleLogout(e)} to="/">
  //           Logout
  //         </NavLink>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Navigation;

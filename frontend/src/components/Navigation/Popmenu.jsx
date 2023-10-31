//React
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

// css
import './Popmenu.css';

// images
import x from '../../images/close-button.png';

// Contex
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const Popmenu = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
  const { user } = useContext(GlobalContext);

  const popMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popMenuRef.current && !popMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsMenuOpen]);

  return (
    <div className={`popmenu ${isMenuOpen ? 'open' : 'close'}`} ref={popMenuRef}>
      <div className="x-container">
        <p className="navigation-user black">{user.email}</p>
        <img className="x" alt="x" src={x} onClick={() => setIsMenuOpen(false)} />
      </div>
      <div className="popmenu-tags-container">
        <NavLink className="popmenu-tags" to="/splits" onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink className="popmenu-tags" onClick={(e) => handleLogout(e)} to="/">
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Popmenu;

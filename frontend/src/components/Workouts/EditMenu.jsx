import React, { useEffect, useRef } from 'react';

// css
import './EditMenu.css';

// images
import x from '../../images/close-button.png';

const EditMenu = ({
  isEditMenuOpen,
  setIsEditMenuOpen,
  handleDeleteExercise,
  id,
  exercise_id,
  exercise,
  handleHistoryOpen,
}) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsEditMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsEditMenuOpen]);

  return (
    isEditMenuOpen && (
      <div className={`editMenu ${isEditMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="x-edit-container">
          <img className="x-edit" alt="x" src={x} onClick={() => setIsEditMenuOpen(false)} />
        </div>

        <div className="edit-tags-container">
          <p onClick={(e) => handleHistoryOpen(exercise)} className="history-exercise">
            - View exercise history
          </p>
          <p onClick={(e) => handleDeleteExercise(e, id, exercise_id)} className="delete-exercise">
            - Delete exercise
          </p>
        </div>
      </div>
    )
  );
};

export default EditMenu;

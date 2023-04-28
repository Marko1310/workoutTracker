// css
import './EditMenu.css';

// images
import x from '../../images/close-button.png';

// Contex
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const EditMenu = ({ isEditMenuOpen, setIsEditMenuOpen, handleDeleteExercise, id, exercise_id }) => {
  const { user } = useContext(GlobalContext);

  return (
    isEditMenuOpen && (
      <div className="editMenu">
        <div className="x-container">
          <img className="x-edit" alt="x" src={x} onClick={() => setIsEditMenuOpen(false)} />
        </div>

        <div className="popmenu-tags-container">
          <p onClick={(e) => handleDeleteExercise(e, id, exercise_id)} className="delete-exercise">
            Delete
          </p>
        </div>
      </div>
    )
  );
};

export default EditMenu;

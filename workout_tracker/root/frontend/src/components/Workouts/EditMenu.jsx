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
  return (
    isEditMenuOpen && (
      <div className="editMenu">
        <div className="x-edit-container">
          <img className="x-edit" alt="x" src={x} onClick={() => setIsEditMenuOpen(false)} />
        </div>

        <div className="edit-tags-container">
          <p onClick={(e) => handleHistoryOpen(exercise)} className="history-exercise">
            History
          </p>
          <p onClick={(e) => handleDeleteExercise(e, id, exercise_id)} className="delete-exercise">
            Delete
          </p>
        </div>
      </div>
    )
  );
};

export default EditMenu;

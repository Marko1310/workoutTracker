import { useDarkMode } from '../../context/DarkModeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()!;
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}
export default DarkModeToggle;

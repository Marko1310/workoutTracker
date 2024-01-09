import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';

const DarkModeContext = createContext(false || '');

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };

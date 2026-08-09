import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'octocat';
  const { value: theme, setValue: setTheme } = useLocalStorage('dev_theme', 'light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ username, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
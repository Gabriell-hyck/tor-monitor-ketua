import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'octocat';

  return (
    <AppContext.Provider value={{ username }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
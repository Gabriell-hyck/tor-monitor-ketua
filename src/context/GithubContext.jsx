import { createContext, useContext } from 'react';
import { useGitHub } from '../hooks/useGitHub';
import { useApp } from './AppContext';

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
  const { username } = useApp();
  const { user, repos, contributions, loading, error } = useGitHub(username);

  return (
    <GitHubContext.Provider value={{ user, repos, contributions, loading, error }}>
      {children}
    </GitHubContext.Provider>
  );
}

export const useGitHubContext = () => useContext(GitHubContext);
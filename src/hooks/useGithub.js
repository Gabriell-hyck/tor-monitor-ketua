import { useState, useEffect } from 'react';
import { fetchUser, fetchRepos, fetchContributions } from '../utils/api';

export function useGitHub(username) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchUser(username),
      fetchRepos(username),
      fetchContributions(username),
    ])
      .then(([userData, reposData, contribData]) => {
        setUser(userData);
        setRepos(reposData);
        setContributions(contribData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return { user, repos, contributions, loading, error };
}
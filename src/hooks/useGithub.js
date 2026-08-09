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
      fetchUser(username).catch(err => { throw err; }),
      fetchRepos(username).catch(err => { throw err; }),
      fetchContributions(username).catch(err => { throw err; }),
    ])
      .then(([userData, reposData, contribData]) => {
        setUser(userData);
        setRepos(reposData);
        setContributions(contribData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return { user, repos, contributions, loading, error };
}
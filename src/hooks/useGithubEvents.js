import { useState, useEffect } from 'react';
import { fetchUserEvents } from '../utils/api';

export function useGitHubEvents(username) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetchUserEvents(username)
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return { events, loading, error };
}
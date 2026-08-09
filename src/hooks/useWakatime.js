import { useState, useEffect } from 'react';
import { fetchWakatimeStats } from '../utils/api';

export function useWakatime() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const key = import.meta.env.VITE_WAKATIME_KEY;

  useEffect(() => {
    if (!key) {
      setLoading(false);
      return;
    }
    fetchWakatimeStats(key)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [key]);

  return { stats, loading };
}
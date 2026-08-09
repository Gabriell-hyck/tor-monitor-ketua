import { useState, useEffect } from 'react';
import { fetchWakaStats, fetchWakaSummaries } from '../utils/api';

export function useWakaTime(range = 'last_7_days') {
  const [stats, setStats] = useState(null);
  const [summaries, setSummaries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = import.meta.env.VITE_WAKATIME_KEY;

  useEffect(() => {
    if (!key) {
      setLoading(false);
      setError('WakaTime key not configured');
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all([
      fetchWakaStats(range),
      fetchWakaSummaries(range),
    ])
      .then(([statsData, summariesData]) => {
        setStats(statsData);
        setSummaries(summariesData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [range, key]);

  return { stats, summaries, loading, error };
}
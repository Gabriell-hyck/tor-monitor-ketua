import { useState, useEffect } from 'react';
import { getSpotifyAccessToken } from '../utils/api';

const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export function useSpotifyData() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!REFRESH_TOKEN) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const { access_token } = await getSpotifyAccessToken(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);
        const [currentRes, recentRes] = await Promise.all([
          fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${access_token}` },
          }),
          fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
            headers: { Authorization: `Bearer ${access_token}` },
          }),
        ]);
        if (currentRes.status === 204) setCurrentTrack(null);
        else if (currentRes.ok) {
          const data = await currentRes.json();
          setCurrentTrack(data.item || null);
        }
        if (recentRes.ok) {
          const data = await recentRes.json();
          setRecentTracks(data.items || []);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { currentTrack, recentTracks, loading, error };
}
import { useState, useEffect } from 'react';
import { getSpotifyAccessToken, fetchSpotifyNowPlaying } from '../utils/api';

export function useSpotify() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

  useEffect(() => {
    if (!refreshToken) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const { access_token } = await getSpotifyAccessToken(refreshToken, clientId, clientSecret);
        const data = await fetchSpotifyNowPlaying(access_token);
        setTrack(data?.item || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  return { track, loading };
}
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchGitHubGraphQL(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error('GitHub API error');
  return res.json();
}

export async function fetchWakatimeStats(key) {
  const res = await fetch(
    `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${key}`
  );
  if (!res.ok) throw new Error('Wakatime API error');
  return res.json();
}

export async function fetchSpotifyNowPlaying(accessToken) {
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 204) return null;
  return res.json();
}

export async function getSpotifyAccessToken(refreshToken, clientId, clientSecret) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  return res.json();
}
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const WAKATIME_KEY = import.meta.env.VITE_WAKATIME_KEY;

// ---------------- GITHUB REST ----------------
export async function fetchUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  return res.json();
}

// ---------------- GITHUB GRAPHQL (contributions) ----------------
export async function fetchGitHubGraphQL(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error('GitHub GraphQL error');
  return res.json();
}

export async function fetchContributions(username) {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await fetchGitHubGraphQL(query, { login: username });
  return data.user.contributionsCollection.contributionCalendar;
}

// ---------------- WAKATIME REST ----------------
async function wakaFetch(endpoint) {
  const res = await fetch(`https://wakatime.com/api/v1${endpoint}`, {
    headers: { Authorization: `Basic ${btoa(WAKATIME_KEY)}` }
  });
  if (!res.ok) throw new Error(`WakaTime fetch failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function fetchWakaStats(range = 'last_7_days') {
  return wakaFetch(`/users/current/stats/${range}`);
}

export async function fetchWakaSummaries(range = 'last_7_days') {
  return wakaFetch(`/users/current/summaries?range=${range}`);
}
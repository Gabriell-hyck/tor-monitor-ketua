import { useState, useEffect } from 'react';
import { fetchGitHubGraphQL } from '../utils/api';

export function useGitHubProfile(username) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query($login: String!) {
        user(login: $login) {
          name
          login
          avatarUrl
          bio
          followers { totalCount }
          following { totalCount }
          repositories { totalCount }
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
    fetchGitHubGraphQL(query, { login: username })
      .then(({ data }) => {
        setProfile(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { profile, loading };
}

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage { name color }
              updatedAt
            }
          }
        }
      }
    `;
    fetchGitHubGraphQL(query, { login: username })
      .then(({ data }) => {
        setRepos(data.user.repositories.nodes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { repos, loading };
}

export function useGitHubContributions(username) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
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
    fetchGitHubGraphQL(query, { login: username })
      .then(({ data }) => {
        const days = data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays)
          .map(day => ({
            date: day.date,
            count: day.contributionCount,
            level: Math.min(4, Math.ceil(day.contributionCount / 5)),
          }));
        setData(days);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { data, loading };
}
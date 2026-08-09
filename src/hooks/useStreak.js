import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStreak(contributions) {
  const { value: bestStreak, setValue: setBestStreak } = useLocalStorage('dev_best_streak', 0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (!contributions || !contributions.weeks) return;
    // Flatten dan urutkan hari, lalu hitung streak dari hari ini mundur
    const days = contributions.weeks
      .flatMap(week => week.contributionDays)
      .map(day => ({ date: day.date, count: day.contributionCount }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    // Mulai dari hari ini atau kemarin
    for (let i = 0; i < days.length; i++) {
      const dayDate = days[i].date;
      if (i === 0 && dayDate !== today && dayDate !== yesterday) break;
      if (days[i].count > 0) {
        streak++;
        // periksa apakah selisih hari = 1
        if (i > 0) {
          const prevDate = new Date(days[i-1].date);
          const currDate = new Date(dayDate);
          const diffDays = Math.round((prevDate - currDate) / (1000 * 60 * 60 * 24));
          if (diffDays > 1) break;
        }
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  }, [contributions]);

  const updateStreak = () => {
    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak);
    }
  };

  // Update best streak setiap kali currentStreak berubah
  useEffect(() => {
    updateStreak();
  }, [currentStreak]);

  return { currentStreak, bestStreak, updateStreak };
}import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStreak(contributions) {
  const { value: bestStreak, setValue: setBestStreak } = useLocalStorage('dev_best_streak', 0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (!contributions || !contributions.weeks) return;
    // Flatten dan urutkan hari, lalu hitung streak dari hari ini mundur
    const days = contributions.weeks
      .flatMap(week => week.contributionDays)
      .map(day => ({ date: day.date, count: day.contributionCount }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    // Mulai dari hari ini atau kemarin
    for (let i = 0; i < days.length; i++) {
      const dayDate = days[i].date;
      if (i === 0 && dayDate !== today && dayDate !== yesterday) break;
      if (days[i].count > 0) {
        streak++;
        // periksa apakah selisih hari = 1
        if (i > 0) {
          const prevDate = new Date(days[i-1].date);
          const currDate = new Date(dayDate);
          const diffDays = Math.round((prevDate - currDate) / (1000 * 60 * 60 * 24));
          if (diffDays > 1) break;
        }
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  }, [contributions]);

  const updateStreak = () => {
    if (currentStreak > bestStreak) {
      setBestStreak(currentStreak);
    }
  };

  // Update best streak setiap kali currentStreak berubah
  useEffect(() => {
    updateStreak();
  }, [currentStreak]);

  return { currentStreak, bestStreak, updateStreak };
}
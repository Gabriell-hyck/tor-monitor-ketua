import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const { value: tasks, setValue: setTasks } = useLocalStorage('dev_tasks', []);

  const addTask = useCallback((text, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const filterTasks = useCallback((filter = 'all') => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks]);

  const sortTasks = useCallback((sort = 'date', taskList = tasks) => {
    const sorted = [...taskList];
    if (sort === 'date') {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sort === 'priority') {
      const order = { high: 1, medium: 2, low: 3 };
      return sorted.sort((a, b) => (order[a.priority] || 2) - (order[b.priority] || 2));
    }
    return sorted;
  }, [tasks]);

  return { tasks, addTask, toggleTask, deleteTask, filterTasks, sortTasks };
}
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const { value: tasks, setValue: setTasks } = useLocalStorage('dev_tasks', []);

  const addTask = useCallback((text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const filterTasks = useCallback((filter) => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks; // 'all'
  }, [tasks]);

  return { tasks, addTask, toggleTask, deleteTask, filterTasks };
}
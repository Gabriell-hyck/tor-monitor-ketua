import { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const taskUtils = useTasks();
  return (
    <TasksContext.Provider value={taskUtils}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasksContext = () => useContext(TasksContext);
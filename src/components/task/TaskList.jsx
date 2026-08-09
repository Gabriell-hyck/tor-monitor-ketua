import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasksContext } from '../../context/TasksContext';
import TaskItem from './TaskItem';
import Card from '../ui/Card';

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask, filterTasks } = useTasksContext();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  const displayedTasks = filterTasks(filter);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Tasks</h3>
        <select
          className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-gray-50"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a task..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-primary"
        />
        <button onClick={handleAdd} className="bg-primary text-accent p-2 rounded-lg">
          <Plus size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {displayedTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
        {displayedTasks.length === 0 && <p className="text-sm text-soft py-4 text-center">No tasks</p>}
      </div>
    </Card>
  );
}
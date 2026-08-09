import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import Card from '../ui/Card';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dev_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');

  const updateStorage = (updated) => {
    setTasks(updated);
    localStorage.setItem('dev_tasks', JSON.stringify(updated));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask.trim(), completed: false };
    updateStorage([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    updateStorage(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    updateStorage(tasks.filter(t => t.id !== id));
  };

  return (
    <Card>
      <h3 className="font-medium mb-4">Tasks</h3>
      <div className="flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-primary"
        />
        <button onClick={addTask} className="bg-primary text-accent p-2 rounded-lg">
          <Plus size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
        {tasks.length === 0 && <p className="text-sm text-soft py-4 text-center">No tasks yet</p>}
      </div>
    </Card>
  );
}
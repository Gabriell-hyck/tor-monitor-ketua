import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasksContext } from '../../context/TasksContext';
import TaskItem from './TaskItem';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask, filterTasks, sortTasks } = useTasksContext();
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date');

  const handleAdd = () => {
    if (newTask.trim()) {
      addTask(newTask.trim(), priority);
      setNewTask('');
    }
  };

  let displayed = filterTasks(filter);
  displayed = sortTasks(sort, displayed);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium dark:text-white">Tasks</h3>
        <select
          className="text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 bg-gray-50"
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
          className="flex-1 bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 ring-primary"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-sm"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleAdd} className="bg-primary text-accent p-2 rounded-lg">
          <Plus size={18} />
        </button>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setSort('date')}
            className={`text-xs px-2 py-1 rounded ${sort === 'date' ? 'bg-primary/30 text-accent' : 'text-soft'}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSort('priority')}
            className={`text-xs px-2 py-1 rounded ${sort === 'priority' ? 'bg-primary/30 text-accent' : 'text-soft'}`}
          >
            Priority
          </button>
        </div>
        <span className="text-xs text-soft">
          {tasks.filter(t => t.completed).length}/{tasks.length} done
        </span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {displayed.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
        {displayed.length === 0 && <p className="text-sm text-soft py-4 text-center">No tasks found.</p>}
      </div>
    </Card>
  );
}
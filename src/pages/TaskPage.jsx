import { motion, AnimatePresence } from 'framer-motion';
import { useTasksContext } from '../context/TasksContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { Plus, Check, Trash2 } from 'lucide-react';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <motion.div layout exit={{ opacity: 0, x: -20 }} className="flex items-center gap-3 py-2 px-1 group">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
          task.completed ? 'bg-accent border-accent' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        {task.completed && <Check size={14} color="white" />}
      </button>
      <span className={`flex-1 text-sm dark:text-white ${task.completed ? 'line-through text-soft' : ''}`}>
        {task.text}
      </span>
      <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}>
        {task.priority}
      </Badge>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-soft hover:text-red-400 transition-opacity"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}

export default function TasksPage() {
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

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold dark:text-white">Tasks</h1>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="Add a task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
        </div>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <Button onClick={handleAdd} className="shrink-0">
          <Plus size={18} className="mr-1" /> Add
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1 rounded-lg capitalize ${
              filter === f ? 'bg-primary/30 text-accent font-medium' : 'text-soft hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="ml-auto text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-2 py-1 bg-white"
        >
          <option value="date">Newest</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 space-y-1">
        <div className="flex justify-between text-sm text-soft mb-2">
          <span>{completedCount} of {totalCount} completed</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 divide-y divide-gray-50 dark:divide-gray-700">
        <AnimatePresence>
          {displayed.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </AnimatePresence>
        {displayed.length === 0 && (
          <p className="text-sm text-soft py-4 text-center">No tasks found.</p>
        )}
      </div>
    </motion.div>
  );
}
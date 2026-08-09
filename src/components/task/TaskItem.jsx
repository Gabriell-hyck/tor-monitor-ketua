import { Check, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 py-2 px-1 group">
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
    </div>
  );
}
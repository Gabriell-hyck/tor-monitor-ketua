import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatDate } from '../../utils/date';
import { Smile, Meh, Frown, Star, Moon } from 'lucide-react';

const moodOptions = [
  { icon: Smile, value: 'happy', label: 'Happy' },
  { icon: Meh, value: 'neutral', label: 'Neutral' },
  { icon: Frown, value: 'sad', label: 'Sad' },
  { icon: Star, value: 'excited', label: 'Excited' },
  { icon: Moon, value: 'tired', label: 'Tired' },
];

export default function CodingDiary() {
  const { value: entries, setValue: setEntries } = useLocalStorage('dev_diary', []);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('happy');

  const addEntry = () => {
    if (!text.trim()) return;
    const entry = { id: Date.now(), text: text.trim(), mood, date: new Date().toISOString() };
    setEntries(prev => [entry, ...prev]);
    setText('');
  };

  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Coding Diary</h3>
      <div className="flex gap-2 mb-3 flex-wrap">
        <Input
          placeholder="How was your day?"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addEntry()}
          className="flex-1"
        />
        <div className="flex gap-1 items-center">
          {moodOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setMood(opt.value)}
              className={`p-1 rounded-lg transition-colors ${
                mood === opt.value ? 'bg-primary/30 text-accent' : 'text-soft hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={opt.label}
            >
              <opt.icon size={20} />
            </button>
          ))}
        </div>
        <Button onClick={addEntry}>Add</Button>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {entries.length === 0 && <p className="text-soft text-sm">No entries yet.</p>}
        {entries.map(entry => {
          const MoodIcon = moodOptions.find(o => o.value === entry.mood)?.icon || Meh;
          return (
            <div key={entry.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm flex gap-2">
              <MoodIcon size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-soft">{formatDate(entry.date)}</p>
                <p className="dark:text-white">{entry.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
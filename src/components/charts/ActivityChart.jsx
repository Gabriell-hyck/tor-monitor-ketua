import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

export default function ActivityChart({ data }) {
  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Coding Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis unit="h" hide />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
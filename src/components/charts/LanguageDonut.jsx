import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const COLORS = ['#A8E6CF', '#8BC6A8', '#2D6A4F', '#6A8F7A', '#1A3A2A'];

export default function LanguageDonut({ data }) {
  return (
    <Card>
      <h3 className="font-medium mb-4 dark:text-white">Languages</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="hours" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
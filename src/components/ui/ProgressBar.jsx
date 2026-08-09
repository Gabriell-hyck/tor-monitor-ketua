export default function ProgressBar({ value, className = '' }) {
  return (
    <div className={`w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: 'linear-gradient(90deg, #A8E6CF, #2D6A4F)',
        }}
      />
    </div>
  );
}
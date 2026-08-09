export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-dark dark:text-white">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm placeholder:text-soft/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-shadow ${className}`}
        {...props}
      />
    </div>
  );
}
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-accent hover:bg-primary/80 active:bg-primary/70',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  ghost: 'bg-transparent text-soft hover:bg-gray-100 dark:hover:bg-gray-700',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
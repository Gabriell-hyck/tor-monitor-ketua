import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quotes } from '../../utils/constants';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [quote] = useState(getRandomQuote);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background dark:bg-gray-900 flex flex-col items-center justify-center z-50"
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md px-6"
        >
          <p className="text-xl font-medium text-dark dark:text-white italic mb-2">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="text-soft mb-8">— {quote.author}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-soft mt-3">{progress}%</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
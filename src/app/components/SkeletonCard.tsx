
'use client';

import { motion } from 'framer-motion';

export const SkeletonCard = () => (
  <div className="glass-card overflow-hidden">
    <div className="relative w-full h-64 bg-gray-700">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-gray-600"
      />
    </div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-gray-700 rounded-md">
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="h-full bg-gray-600 rounded-md"
        />
      </div>
    </div>
  </div>
);

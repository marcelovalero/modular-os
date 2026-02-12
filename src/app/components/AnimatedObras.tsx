
'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { Obra } from '@/services/databaseService';

const ObraCard = ({ obra }: { obra: Obra }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative w-full h-64">
        <img 
          src={obra.imagem} 
          alt={obra.titulo} 
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{obra.titulo}</h3>
      </div>
    </motion.div>
  );
};

export const AnimatedObras = ({ obras }: { obras: Obra[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {obras.map(obra => (
        <ObraCard key={obra.id} obra={obra} />
      ))}
    </div>
  );
};

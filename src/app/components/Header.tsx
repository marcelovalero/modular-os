
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      controls.start({
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      });
    } else {
      controls.start({
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(17, 24, 39, 0)',
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
      });
    }
  }, [isScrolled, controls]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-white">Portfólio</a>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#portfolio" legacyBehavior>
              <a className="text-gray-300 hover:text-white transition-colors duration-300">Projetos</a>
            </Link>
            <Link href="/admin" legacyBehavior>
              <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">Admin</a>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

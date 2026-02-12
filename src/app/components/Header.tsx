
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
      }}
      transition={{ duration: 0.3 }}
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

export default Header;

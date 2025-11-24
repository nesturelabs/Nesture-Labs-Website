import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
    : 'bg-gray-900 border border-gray-800';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/20' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`${baseClasses} ${backgroundClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};
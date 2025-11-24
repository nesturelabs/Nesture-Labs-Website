import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTheme } from '../layout/ThemeProvider';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const { isDarkMode } = useTheme();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl active:scale-95',
    secondary: isDarkMode 
      ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 shadow-md hover:shadow-lg',
    outline: isDarkMode
      ? 'border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white focus:ring-blue-500 shadow-md hover:shadow-lg'
      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 shadow-md hover:shadow-lg',
    ghost: isDarkMode
      ? 'text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-gray-500'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`${iconSizeClasses[size]} mr-2 flex-shrink-0`} />
      )}
      <span className="flex-1">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={`${iconSizeClasses[size]} ml-2 flex-shrink-0`} />
      )}
    </motion.button>
  );
};
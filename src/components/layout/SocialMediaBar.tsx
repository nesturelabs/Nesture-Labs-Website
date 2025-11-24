import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const SocialMediaBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/nesturelabs', 
      color: '#1877F2', 
      name: 'Facebook',
      hoverColor: '#166FE5'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/nesturelabs', 
      color: '#1DA1F2', 
      name: 'Twitter',
      hoverColor: '#1A91DA'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/nesturelabs', 
      color: '#0A66C2', 
      name: 'LinkedIn',
      hoverColor: '#095BA1'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/nesturelabs', 
      color: '#E4405F', 
      name: 'Instagram',
      hoverColor: '#D73A56'
    },
    { 
      icon: Youtube, 
      href: 'https://youtube.com/nesturelabs', 
      color: '#FF0000', 
      name: 'YouTube',
      hoverColor: '#E60000'
    },
    { 
      icon: Github, 
      href: 'https://github.com/nesturelabs', 
      color: isDarkMode ? '#FFFFFF' : '#333333', 
      name: 'GitHub',
      hoverColor: isDarkMode ? '#E6E6E6' : '#1A1A1A'
    }
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex items-center">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`backdrop-blur-sm border rounded-r-lg p-3 ${
                isDarkMode 
                  ? 'bg-gray-900/90 border-gray-700' 
                  : 'bg-white/90 border-gray-200'
              }`}
            >
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
                    style={{ 
                      backgroundColor: `${social.color}15`,
                      border: `2px solid ${social.color}30`
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: social.color,
                      borderColor: social.hoverColor,
                      boxShadow: `0 8px 25px ${social.color}40`
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: social.color }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <social.icon 
                      className="w-6 h-6 relative z-10 transition-colors duration-200"
                      style={{ color: social.color }}
                    />
                    
                    {/* Tooltip */}
                    <div className={`absolute left-full ml-3 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap transform translate-x-2 group-hover:translate-x-0 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white border border-gray-700' 
                        : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
                    }`}>
                      {social.name}
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 ${
                        isDarkMode ? 'bg-gray-800 border-l border-b border-gray-700' : 'bg-white border-l border-b border-gray-200'
                      }`}></div>
                    </div>

                    {/* Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ backgroundColor: social.color }}
                      initial={{ scale: 0, opacity: 0.5 }}
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          className={`backdrop-blur-sm border rounded-r-lg p-3 transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800/90' 
              : 'bg-white/90 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50/90'
          }`}
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isVisible ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isVisible ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
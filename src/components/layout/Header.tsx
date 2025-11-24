import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
//import { Menu, X, Sun, Moon, Globe, MessageSquare, Phone, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { QuoteForm } from '../ui/QuoteForm';
import { useTheme } from './ThemeProvider';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [language, setLanguage] = useState('EN');
  const [activeSection, setActiveSection] = useState('home');
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Scroll spy for active section highlighting
      const sections = ['home', 'services', 'about', 'portfolio', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/about', section: 'about' },
    { name: 'Services', path: '/services', section: 'services' },
    // { name: 'Portfolio', path: '/portfolio', section: 'portfolio' },
    // { name: 'Blog', path: '/blog', section: 'blog' },
    { name: 'Contact', path: '/contact', section: 'contact' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Navigation arrows for easy page navigation
  const currentPageIndex = navItems.findIndex(item => item.path === location.pathname);
  const prevPage = currentPageIndex > 0 ? navItems[currentPageIndex - 1] : navItems[navItems.length - 1];
  const nextPage = currentPageIndex < navItems.length - 1 ? navItems[currentPageIndex + 1] : navItems[0];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? isDarkMode 
              ? 'bg-gray-900/98 backdrop-blur-lg border-b border-gray-800 shadow-lg' 
              : 'bg-white/98 backdrop-blur-lg border-b border-gray-200 shadow-lg'
            : 'bg-transparent'
        }`}
        role="banner"
        aria-label="Main navigation"
      >
        <nav className="container mx-auto px-4 py-3 lg:py-4" role="navigation" aria-label="Primary navigation">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              aria-label="Nesturelabs - Web Development and Digital Solutions"
              title="Go to homepage"
            >
            <div 
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-6"
              role="img"
              aria-label="Nesturelabs logo"
            >
              <span className="text-white font-bold text-lg" aria-hidden="true">N</span>
            </div>
              {/* <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div> */}
              <span 
                className={`text-xl lg:text-2xl font-bold transition-colors ${
                  isDarkMode
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 group-hover:text-blue-400'
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}
                itemProp="name"
              >
                Nesturelabs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-8" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    onClick={() => location.pathname === '/' && scrollToSection(item.section)}
                    className={`text-xl font-medium transition-all duration-200 relative group ${
                      location.pathname === item.path || (location.pathname === '/' && activeSection === item.section)
                        ? 'text-blue-600'
                        : isDarkMode 
                          ? 'text-gray-300 hover:text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                    }`}
                    role="menuitem"
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    title={`Navigate to ${item.name} page`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full ${
                      location.pathname === item.path || (location.pathname === '/' && activeSection === item.section) ? 'w-full' : ''
                    }`} aria-hidden="true"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              {/* <div className="relative group hidden sm:block">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`text-sm rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <option value="EN">🇺🇸 EN</option>
                  <option value="SI">🇱🇰 SI</option>
                  <option value="TA">🇱🇰 TA</option>
                </select>
              </div> */}

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                title={`Toggle ${isDarkMode ? 'light' : 'dark'} theme`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDarkMode ? 'dark' : 'light'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Button 
                  size="sm" 
                  variant="primary" 
                  className="shadow-lg hover:shadow-xl"
                  onClick={() => setIsQuoteFormOpen(true)}
                >
                  Get Quote
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${isMenuOpen ? 'Close' : 'Open'} mobile navigation menu`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                title={`${isMenuOpen ? 'Close' : 'Open'} navigation menu`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`lg:hidden mt-4 border-t pt-4 rounded-b-lg ${
                  isDarkMode 
                    ? 'border-gray-800 bg-gray-900/95 backdrop-blur-sm' 
                    : 'border-gray-200 bg-white/95 backdrop-blur-sm'
                }`}
                role="menu"
                aria-label="Mobile navigation menu"
              >
                <div className="flex flex-col space-y-4 px-2 pb-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      role="none"
                    >
                      <Link
                        to={item.path}
                        onClick={() => {
                          if (location.pathname === '/') {
                            scrollToSection(item.section);
                          } else {
                            toggleMenu();
                          }
                        }}
                        className={`block text-base font-medium transition-colors duration-200 py-2 px-3 rounded-lg ${
                          location.pathname === item.path || (location.pathname === '/' && activeSection === item.section)
                            ? isDarkMode 
                              ? 'text-blue-400 bg-blue-900/20' 
                              : 'text-blue-600 bg-blue-50'
                            : isDarkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                        }`}
                        role="menuitem"
                        aria-current={location.pathname === item.path ? 'page' : undefined}
                        title={`Navigate to ${item.name} page`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Language Selector */}
                  {/* <div className="pt-2">
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`w-full text-sm rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-800 text-gray-300 border-gray-700' 
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      <option value="EN">🇺🇸 English</option>
                      <option value="SI">🇱🇰 Sinhala</option>
                      <option value="TA">🇱🇰 Tamil</option>
                    </select>
                  </div> */}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-2 px-3"
                  >
                    <Button 
                      size="sm" 
                      variant="primary" 
                      className="w-full"
                      onClick={() => {
                        setIsQuoteFormOpen(true);
                        toggleMenu();
                      }}
                      aria-label="Request a quote for our services"
                    >
                      Get Quote
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Navigation Arrows for Easy Page Navigation */}
      <aside 
        className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 hidden lg:block"
        aria-label="Page navigation shortcuts"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col space-y-2"
        >
          <Link to={prevPage.path}>
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              title={`Previous: ${prevPage.name}`}
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
            </motion.button>
          </Link>
          
          <div className={`w-12 h-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          
          <Link to={nextPage.path}>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              title={`Next: ${nextPage.name}`}
            >
              <ChevronRight className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
            </motion.button>
          </Link>
        </motion.div>
      </aside>

      {/* Quote Form Modal */}
      <QuoteForm 
        isOpen={isQuoteFormOpen} 
        onClose={() => setIsQuoteFormOpen(false)} 
      />
    </>
  );
};
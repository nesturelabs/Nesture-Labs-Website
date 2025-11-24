import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Globe, Smartphone, Brain } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../layout/ThemeProvider';

export const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isDarkMode } = useTheme();
  
  const texts = React.useMemo(() => [
    'Web Solutions that Scale',
    'Mobile Apps that Delight', 
    'AI Systems that Learn'
  ], []);

  const backgroundImages = [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const services = [
    {
      icon: Globe,
      title: 'Web App Development',
      description: 'Scalable web solutions built with modern frameworks',
      color: 'text-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      color: 'text-purple-600'
    },
    {
      icon: Brain,
      title: 'AI Solutions Development',
      description: 'Intelligent systems powered by machine learning',
      color: 'text-green-600'
    }
  ];

  useEffect(() => {
    const text = texts[currentIndex];
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, texts]);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(imageTimer);
  }, [backgroundImages.length]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SEO-optimized structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Your Company Name",
          "description": "Building tomorrow's technology solutions with web applications, mobile apps, and AI systems",
          "services": [
            {
              "@type": "Service",
              "name": "Web Application Development",
              "description": "Scalable web solutions built with modern frameworks"
            },
            {
              "@type": "Service", 
              "name": "Mobile App Development",
              "description": "Native and cross-platform mobile applications"
            },
            {
              "@type": "Service",
              "name": "AI Solutions Development", 
              "description": "Intelligent systems powered by machine learning"
            }
          ]
        })}
      </script>

      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        role="banner"
        aria-label="Hero section showcasing technology services"
      >
        {/* Background Image Slideshow */}
        <div className="absolute inset-0" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={backgroundImages[currentImageIndex]}
                alt={`Technology workspace showcasing modern development environment ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                loading={currentImageIndex === 0 ? "eager" : "lazy"}
                decoding={currentImageIndex === 0 ? "sync" : "async"}
              />
              {/* Dark overlay for better text readability */}
              <div className={`absolute inset-0 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-900/85 via-gray-900/75 to-gray-900/85'
                  : 'bg-gradient-to-br from-white/85 via-white/75 to-white/85'
              }`}></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.5"/>
                <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" opacity="0.3"/>
                <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" opacity="0.3"/>
                <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)" className="text-blue-600"/>
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full opacity-60"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-5xl mx-auto">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold mb-4 sm:mb-6 leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="block mb-1 sm:mb-2 text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem]">
                  Building Tomorrow's
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 min-h-[1.2em] inline-block text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem]">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              {/* <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Ready to transform your ideas into reality? Let's discuss your project and create something amazing together.
              </motion.p> */}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4"
              >
                <Button 
                  size="lg" 
                  icon={ArrowRight} 
                  iconPosition="right"
                  onClick={scrollToServices}
                  className="w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  aria-label="Start your project - scroll to services section"
                >
                  Start Your Project
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  icon={Play} 
                  iconPosition="left"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  aria-label="Watch our company story video"
                >
                  Watch Our Story
                </Button>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12 px-4"
              >
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div 
                      key={service.title}
                      className={`text-center backdrop-blur-lg rounded-xl p-4 sm:p-6 border group cursor-pointer ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                          : 'bg-gray-900/10 border-gray-900/20 hover:bg-gray-900/15'
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.8 + index * 0.1
                      }}
                      role="article"
                      aria-labelledby={`service-${index}-title`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 ${service.color} bg-current/10 group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${service.color}`} aria-hidden="true" />
                      </div>
                      <h3 
                        id={`service-${index}-title`}
                        className={`text-lg sm:text-xl font-bold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className={`text-sm sm:text-base leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {service.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          role="button"
          aria-label="Scroll down to see more content"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToServices();
            }
          }}
        >
          <div className={`w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full flex justify-center cursor-pointer hover:scale-110 transition-transform duration-200 ${
            isDarkMode ? 'border-gray-300' : 'border-gray-700'
          }`}>
            <div className={`w-0.5 sm:w-1 h-2 sm:h-3 rounded-full mt-1.5 sm:mt-2 animate-bounce ${
              isDarkMode ? 'bg-gray-300' : 'bg-gray-700'
            }`}></div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../layout/ThemeProvider';

export const TechStack: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const { isDarkMode } = useTheme();

  const technologies = [
    { 
      name: 'React', 
      color: '#61DAFB', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      category: 'Frontend',
      description: 'Modern UI library'
    },
    { 
      name: 'Next.js', 
      color:'#000000', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      category: 'Frontend',
      description: 'React framework'
    },
    { 
      name: 'Node.js', 
      color: '#339933', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      category: 'Backend',
      description: 'JavaScript runtime'
    },
    { 
      name: 'Python', 
      color: '#3776AB', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      category: 'Backend',
      description: 'Versatile language'
    },
    { 
      name: 'Flutter', 
      color: '#02569B', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      category: 'Mobile',
      description: 'Cross-platform'
    },
    { 
      name: 'TensorFlow', 
      color: '#FF6F00', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      category: 'AI/ML',
      description: 'Machine learning'
    },
    { 
      name: 'MongoDB', 
      color: '#47A248', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      category: 'Database',
      description: 'NoSQL database'
    },
    { 
      name: 'PostgreSQL', 
      color: '#336791', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      category: 'Database',
      description: 'SQL database'
    },
    { 
      name: 'AWS', 
      color: '#FF9900', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      category: 'Cloud',
      description: 'Cloud platform'
    },
    { 
      name: 'Docker', 
      color: '#2496ED', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      category: 'DevOps',
      description: 'Containerization'
    },
    { 
      name: 'Kubernetes', 
      color: '#326CE5', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      category: 'DevOps',
      description: 'Orchestration'
    },
    { 
      name: 'Firebase', 
      color: '#FFCA28', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      category: 'Backend',
      description: 'BaaS platform'
    }
  ];

    // const categories = ['Frontend', 'Backend', 'Mobile', 'AI/ML', 'Database', 'Cloud', 'DevOps'];
  // const categoryColors = {
  //   'Frontend': 'from-blue-500 to-cyan-500',
  //   'Backend': 'from-green-500 to-emerald-500',
  //   'Mobile': 'from-purple-500 to-violet-500',
  //   'AI/ML': 'from-orange-500 to-red-500',
  //   'Database': 'from-yellow-500 to-amber-500',
  //   'Cloud': 'from-indigo-500 to-blue-500',
  //   'DevOps': 'from-pink-500 to-rose-500'
  // };

  //   const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, scale: 0.8, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5
  //     }
  //   }
  // };

  return (
    <section className={`py-20 relative overflow-hidden ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="tech-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.4"/>
                <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" className="text-blue-600"/>
            <rect width="100%" height="100%" fill="url(#gridGradient)"/>
          </svg>
        </div>

        {/* Enhanced Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `linear-gradient(45deg, #3B82F6, #8B5CF6, #06B6D4)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full mb-4">
                Technologies We Master
              </span>
            </motion.div> */}
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Tech Stack
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We leverage cutting-edge technologies and modern frameworks to build robust, 
              scalable solutions that drive innovation and deliver exceptional user experiences.
            </motion.p>
          </div>

          {/* Enhanced Technology Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  y: 20,
                  rotateX: -15
                }}
                animate={inView ? {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateX: 0,
                } : {
                  opacity: 0, 
                  scale: 0.8, 
                  y: 20,
                  rotateX: -15
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  duration: 0.6,
                  delay: index * 0.08
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="group perspective-1000 cursor-pointer h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`relative backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border-2 transition-all duration-500 h-full flex flex-col justify-between min-h-[200px] ${
                    isDarkMode 
                      ? 'bg-gray-800/40 border-gray-700/50 hover:border-blue-500/60' 
                      : 'bg-white/60 border-gray-200/60 hover:border-blue-500/60'
                  }`}
                  style={{
                    boxShadow: isDarkMode 
                      ? '0 4px 20px rgba(0,0,0,0.3)' 
                      : '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Animated Background Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30"
                    style={{ 
                      background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`
                    }}
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: 1.2,
                      opacity: 0.3,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  />

                  {/* Enhanced Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none group-hover:opacity-30"
                    style={{ 
                      background: `radial-gradient(circle at center, ${tech.color}30 0%, transparent 70%)`
                    }}
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: 1.2,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Enhanced Logo Container */}
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center flex-shrink-0">
                      <motion.div
                        className="relative"
                        whileHover={{
                          scale: 1.2,
                          rotateZ: 360,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                          }
                        }}
                      >
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-full h-full object-contain transition-all duration-300"
                          style={{ 
                            filter: `drop-shadow(0 4px 8px ${tech.color}40)`,
                          }}
                        />
                        
                        {/* Logo Glow Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60"
                          style={{
                            background: `conic-gradient(from 0deg, ${tech.color}40, transparent, ${tech.color}40)`,
                            filter: 'blur(8px)',
                          }}
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Text Content */}
                    <div className="flex-grow flex flex-col justify-center">
                      <motion.h3 
                        className={`font-bold text-sm md:text-lg mb-2 transition-all duration-300 line-clamp-1 ${
                          isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        title={tech.name}
                      >
                        {tech.name}
                      </motion.h3>
                      
                      <p className={`text-xs md:text-sm mb-3 transition-colors duration-300 line-clamp-2 ${
                        isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                        {tech.description}
                      </p>
                    </div>
                    
                    {/* Enhanced Category Badge */}
                    <div className="flex-shrink-0">
                      <motion.span 
                        className="inline-block px-2 md:px-3 py-1 text-xs rounded-full text-white font-medium shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${tech.color}, ${tech.color}dd)`,
                          boxShadow: `0 4px 12px ${tech.color}40`
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: `0 6px 20px ${tech.color}60`
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {tech.category}
                      </motion.span>
                    </div>
                  </div>

                  {/* Enhanced Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, transparent, ${tech.color}20, transparent)`,
                      padding: '2px',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((category, index) => {
              const categoryTechs = technologies.filter(tech => tech.category === category);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700/50 hover:border-blue-500/30' 
                      : 'bg-white/80 border-gray-200 hover:border-blue-500/30'
                  }`}
                >
                  <div className={`h-2 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`}></div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {categoryTechs.map((tech, techIndex) => (
                        <motion.div
                          key={tech.name}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                            isDarkMode 
                              ? 'bg-gray-700/50 border-gray-600' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                        >
                          <img
                            src={tech.logo}
                            alt={tech.name}
                            className="w-5 h-5 object-contain"
                            style={{ 
                              filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
                            }}
                          />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {tech.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div> */}

          {/* Enhanced Bottom CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.div
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'border-blue-500/30 text-blue-400 hover:border-blue-500 hover:bg-blue-500/10' 
                  : 'border-blue-500/30 text-blue-600 hover:border-blue-500 hover:bg-blue-500/10'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">Ready to innovate with us?</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};
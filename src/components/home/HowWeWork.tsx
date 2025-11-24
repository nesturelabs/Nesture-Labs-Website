import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Palette, Code, TestTube, Rocket, Headphones } from 'lucide-react';
import { useTheme } from '../layout/ThemeProvider';

export const HowWeWork: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { isDarkMode } = useTheme();

  const steps = [
    {
      icon: Search,
      title: 'Discover',
      description: 'We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500',
      keywords: 'business analysis, project planning, requirements gathering'
    },
    {
      icon: Palette,
      title: 'Design',
      description: 'Our design team creates intuitive user experiences and stunning visual interfaces that align with your brand identity.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500',
      keywords: 'UI/UX design, user experience, brand identity'
    },
    {
      icon: Code,
      title: 'Develop',
      description: 'Using cutting-edge technologies and best practices, we build scalable, secure, and high-performance solutions.',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500',
      keywords: 'web development, software development, programming'
    },
    {
      icon: TestTube,
      title: 'Test',
      description: 'Rigorous testing across multiple devices and scenarios ensures your solution works flawlessly for every user.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500',
      keywords: 'quality assurance, software testing, bug testing'
    },
    {
      icon: Rocket,
      title: 'Deploy',
      description: 'We handle the entire deployment process, ensuring a smooth launch with minimal downtime and maximum impact.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500',
      keywords: 'deployment, launch, go-live, production'
    },
    {
      icon: Headphones,
      title: 'Support',
      description: 'Our commitment continues post-launch with ongoing maintenance, updates, and 24/7 technical support.',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500',
      keywords: 'technical support, maintenance, customer service'
    }
  ];

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Development Process Methodology",
    "description": "Our proven 6-step methodology ensures successful project delivery from concept to completion",
    "provider": {
      "@type": "Organization",
      "name": "Nesture Labs",
      "url": "https://nesturelabs.com",
      "logo": "https://nesturelabs.com/logo.png"
    },
    "serviceType": "Software Development Process",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": steps.map((step) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": step.title,
          "description": step.description
        }
      }))
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section 
        className={`py-20 relative overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-900' 
            : 'bg-gradient-to-br from-gray-50 to-blue-50'
        }`}
        id="how-we-work"
        aria-labelledby="how-we-work-heading"
        role="region"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
              : 'bg-gradient-to-r from-blue-300/30 to-purple-300/30'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse animation-delay-2000 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' 
              : 'bg-gradient-to-r from-purple-300/30 to-pink-300/30'
          }`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <header className="text-center mb-16">
              <motion.h1
                id="how-we-work-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                How We <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-blue-400 to-purple-400' 
                    : 'from-blue-600 to-purple-600'
                }`}>Work</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-xl lg:text-2xl max-w-3xl mx-auto transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                role="doc-subtitle"
              >
                Our proven methodology ensures successful project delivery from concept to completion
              </motion.p>
            </header>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative" role="presentation">
              {/* Central Timeline Line */}
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400' 
                    : 'bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600'
                }`}
                aria-hidden="true"
              ></div>
              
              {/* Animated Flow */}
              <motion.div
                className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}
                animate={{
                  y: [0, 120, 240, 360, 480, 600],
                  opacity: [1, 0.8, 0.6, 0.8, 1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                aria-hidden="true"
              />

              <ol className="space-y-24" role="list">
                {steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <motion.article 
                        className={`backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 group ${
                          isDarkMode 
                            ? 'bg-gray-800/80 border-gray-700/50 hover:border-blue-500/30' 
                            : 'bg-white/80 border-gray-200/50 hover:border-blue-500/30 shadow-lg hover:shadow-xl'
                        }`}
                        whileHover={{ scale: 1.02, y: -5 }}
                        itemScope
                        itemType="https://schema.org/Service"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div 
                            className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            role="img"
                            aria-label={`${step.title} icon`}
                          >
                            <step.icon className="w-6 h-6 text-white" aria-hidden="true" />
                          </div>
                          <h2 
                            className={`text-2xl font-bold transition-colors duration-300 ${
                              isDarkMode 
                                ? 'text-white group-hover:text-blue-400' 
                                : 'text-gray-900 group-hover:text-blue-600'
                            }`}
                            itemProp="name"
                          >
                            {step.title}
                          </h2>
                        </div>
                        <p 
                          className={`leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          itemProp="description"
                        >
                          {step.description}
                        </p>
                        
                        {/* Hidden keywords for SEO */}
                        <meta itemProp="keywords" content={step.keywords} />
                        
                        {/* Progress indicator */}
                        <div 
                          className={`mt-4 h-1 rounded-full overflow-hidden transition-colors duration-300 ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}
                          role="progressbar"
                          aria-label={`${step.title} progress indicator`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={100}
                        >
                          <motion.div
                            className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                        
                        {/* Floating particles/bubbles */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={`particle-${index}-${i}`}
                              className={`absolute w-2 h-2 rounded-full opacity-20 transition-colors duration-300 ${
                                isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                              }`}
                              animate={{
                                y: [0, -20, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                                opacity: [0.2, 0.5, 0.2],
                              }}
                              transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                              }}
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                              }}
                            />
                          ))}
                        </div>
                      </motion.article>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <motion.div
                        className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center border-4 relative z-10 shadow-2xl transition-colors duration-300 ${
                          isDarkMode ? 'border-gray-900' : 'border-white'
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        role="img"
                        aria-label={`Step ${index + 1}: ${step.title}`}
                      >
                        <step.icon className="w-10 h-10 text-white" aria-hidden="true" />
                        
                        {/* Pulse effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-30`}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    </div>
                    
                    <div className="w-5/12"></div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Mobile Timeline */}
            <ol className="lg:hidden space-y-8" role="list">
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    role="img"
                    aria-label={`Step ${index + 1}: ${step.title}`}
                  >
                    <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <article 
                    className={`backdrop-blur-sm rounded-2xl p-6 border flex-1 transition-all duration-300 relative ${
                      isDarkMode 
                        ? 'bg-gray-800/80 border-gray-700/50' 
                        : 'bg-white/80 border-gray-200/50 shadow-lg'
                    }`}
                    itemScope
                    itemType="https://schema.org/Service"
                  >
                    <h2 
                      className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      itemProp="name"
                    >
                      {step.title}
                    </h2>
                    <p 
                      className={`leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      itemProp="description"
                    >
                      {step.description}
                    </p>
                    
                    {/* Hidden keywords for SEO */}
                    <meta itemProp="keywords" content={step.keywords} />
                    
                    <div 
                      className={`mt-4 h-1 rounded-full overflow-hidden transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                      role="progressbar"
                      aria-label={`${step.title} progress indicator`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={100}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    
                    {/* Floating particles for mobile */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                      {[...Array(2)].map((_, i) => (
                        <motion.div
                          key={`mobile-particle-${index}-${i}`}
                          className={`absolute w-2 h-2 rounded-full opacity-20 transition-colors duration-300 ${
                            isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                          }`}
                          animate={{
                            y: [0, -15, 0],
                            x: [0, Math.random() * 8 - 4, 0],
                            opacity: [0.2, 0.4, 0.2],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                          style={{
                            left: `${30 + Math.random() * 40}%`,
                            top: `${30 + Math.random() * 40}%`,
                          }}
                        />
                      ))}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </>
  );
};
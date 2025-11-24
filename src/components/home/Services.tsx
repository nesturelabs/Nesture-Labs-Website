import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'lucide-react';
import { services } from '../../data/services';
import { Card } from '../ui/Card';
import { useTheme } from '../layout/ThemeProvider';

export const Services: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px' // Preload slightly before visible
  });

  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section 
      id="services" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}
      role="region"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Background Image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={isDarkMode 
            ? "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920"
            : "https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=1920"
          }
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isDarkMode ? 'opacity-10' : 'opacity-5'
          }`}
          loading="lazy"
          decoding="async"
          role="presentation"
        />
        <div className={`absolute inset-0 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900/90 to-gray-900/80'
            : 'bg-gradient-to-br from-white/80 to-blue-50/90'
        }`} aria-hidden="true"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <header className="text-center mb-16">
            <motion.h2 
              id="services-heading" 
              variants={itemVariants} 
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 transition-colors duration-300 leading-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} 
              itemProp="name"
            >
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Our Services
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Tailored for Your Success
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className={`text-xl lg:text-2xl max-w-3xl mx-auto transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              itemProp="description"
            >
              Comprehensive technology solutions designed to accelerate your digital transformation
            </motion.p>
          </header>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Our professional services"
            itemProp="hasOfferCatalog"
            itemScope
            itemType="https://schema.org/OfferCatalog"
          >
            {services.map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              
              return (
                <motion.article
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Service"
                  aria-labelledby={`service-title-${service.id}`}
                  aria-describedby={`service-desc-${service.id}`}
                >
                  <Card 
                    className={`p-6 h-full relative overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80'
                        : 'bg-white/80 border-gray-200/50 hover:bg-white/95 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div 
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${service.color}`}
                      aria-hidden="true"
                    ></div>
                    
                    <div className="relative z-10">
                      <header className="flex items-center mb-4">
                        <div 
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                          role="img"
                          aria-label={`${service.title} service icon`}
                        >
                          <IconComponent className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        
                        <h3 
                          id={`service-title-${service.id}`}
                          className={`text-xl font-semibold transition-colors duration-300 ${
                            isDarkMode 
                              ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400'
                              : 'text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600'
                          }`}
                          itemProp="name"
                        >
                          {service.title}
                        </h3>
                      </header>
                      
                      <p 
                        id={`service-desc-${service.id}`}
                        className={`mb-4 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                        itemProp="description"
                      >
                        {service.description}
                      </p>
                      
                      <ul 
                        className="space-y-2"
                        role="list"
                        aria-label={`${service.title} key features`}
                      >
                        {service.features.map((feature, featureIndex) => (
                          <li 
                            key={`${service.id}-feature-${featureIndex}`}
                            className={`flex items-center text-sm transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            itemProp="serviceOutput"
                          >
                            <Icons.Check 
                              className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                                isDarkMode ? 'text-blue-400' : 'text-blue-600'
                              }`} 
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Optional Learn More Button */}
                      {/* <motion.button
                        whileHover={{ x: 5 }}
                        className={`mt-6 font-medium transition-colors duration-200 flex items-center text-sm ${
                          isDarkMode 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        Learn More 
                        <Icons.ArrowRight className="w-4 h-4 ml-1" />
                      </motion.button> */}
                      
                      {/* Service Category/Type for SEO */}
                      <meta itemProp="serviceType" content={service.title || 'Technology Service'} />
                      <meta itemProp="provider" content="Nesturelabs" />
                      <meta itemProp="areaServed" content="Global" />
                    </div>

                    {/* Floating particles/bubbles */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`particle-${service.id}-${i}`}
                          className={`absolute w-2 h-2 rounded-full opacity-20 ${
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
                  </Card>
                </motion.article>
              );
            })}
          </div>

          {/* Hidden structured data for better SEO */}
          <div className="sr-only" aria-hidden="true">
            <div itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Nesturelabs" />
              <meta itemProp="url" content="https://nesturelabs.com" />
              <meta itemProp="description" content="Professional web development and digital solutions company" />
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <meta itemProp="addressCountry" content="LK" />
                <meta itemProp="addressRegion" content="Western Province" />
                <meta itemProp="addressLocality" content="Colombo" />
              </div>
              <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <meta itemProp="contactType" content="customer service" />
                <meta itemProp="areaServed" content="Global" />
                <meta itemProp="availableLanguage" content="English" />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {/* <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-2xl'
              }`}
            >
              Get Started Today
            </motion.button>
          </motion.div> */}
        </motion.div>
      </div>

      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Nesturelabs",
            "description": "Professional web development and digital solutions company",
            "url": "https://nesturelabs.com",
            "logo": "https://nesturelabs.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "LK",
              "addressRegion": "Western Province",
              "addressLocality": "Colombo"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "areaServed": "Global",
              "availableLanguage": "English"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Services",
              "itemListElement": services.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description,
                  "provider": {
                    "@type": "Organization",
                    "name": "Nesturelabs"
                  },
                  "areaServed": "Global",
                  "serviceOutput": service.features
                },
                "position": index + 1
              }))
            }
          })
        }}
      />
    </section>
  );
};
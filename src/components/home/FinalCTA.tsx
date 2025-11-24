import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Calendar, ArrowRight, Sparkles, Star, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleConsultationClick = () => {
    // Track conversion event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Book Free Consultation',
        value: 1
      });
    }
    window.open('https://calendly.com/nesturelabs/30min', '_blank');
  };

  const handleViewWorkClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'View Our Work',
        value: 1
      });
    }
    navigate('/portfolio');
  };

  // Structured data for the service offering
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free Software Development Consultation",
    "provider": {
      "@type": "Organization",
      "name": "Nesture Labs"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "name": "Free 30-minute Consultation",
      "description": "No commitment consultation with expert software development advice",
      "url": "https://calendly.com/nesturelabs/30min"
    },
    "serviceType": "Software Development Consultation",
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://calendly.com/nesturelabs/30min",
      "serviceType": "Online"
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
        className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden"
        aria-label="Call to action section"
        role="banner"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Floating Shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: Math.random() * 120 + 30,
                height: Math.random() * 120 + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              aria-hidden="true"
            />
          ))}
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse" aria-hidden="true"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse animation-delay-2000" aria-hidden="true"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Sparkle Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm"
              aria-hidden="true"
            >
              <Sparkles className="w-10 h-10 text-white" aria-hidden="true" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              id="cta-heading"
            >
              Let's Build the Future{' '}
              <span className="relative">
                Together
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-white/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              aria-describedby="cta-heading"
            >
              Ready to transform your ideas into reality? Let's discuss your project and create something amazing together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              role="group"
              aria-label="Call to action buttons"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.08, 
                  rotate: [0, -1, 1, 0],
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }} 
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  rotate: { duration: 0.6 }
                }}
                className="mb-4 sm:mb-0"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  icon={Calendar}
                  iconPosition="left"
                  onClick={handleConsultationClick}
                  className="bg-white/90 text-indigo-900 border-2 border-white hover:bg-white 
                            dark:bg-purple-700 dark:text-white dark:border-purple-400 
                            dark:hover:bg-purple-600 shadow-xl px-8 py-4 text-lg font-semibold cursor-pointer
                            hover:shadow-2xl transition-all duration-300 hover:border-indigo-200
                            transform hover:-translate-y-1 active:translate-y-0"
                  aria-label="Book a free 30-minute consultation with Nesture Labs"
                  data-testid="book-consultation-cta"
                >
                  Book a Free Consultation
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ 
                  scale: 1.08, 
                  rotate: [0, 1, -1, 0],
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)"
                }} 
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  rotate: { duration: 0.6 }
                }}
                className="mb-4 sm:mb-0"
              >
                <Button
                  size="lg"
                  variant="outline"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={handleViewWorkClick}
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 
                            dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-indigo-900 
                            shadow-xl px-8 py-4 text-lg font-semibold cursor-pointer
                            hover:shadow-2xl transition-all duration-300 hover:border-indigo-200
                            transform hover:-translate-y-1 active:translate-y-0 hover:bg-white/95"
                  aria-label="View our portfolio and previous work"
                  data-testid="view-work-cta"
                >
                  View Our Work
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              role="region"
              aria-label="Service benefits and guarantees"
            >
              <motion.article 
                className="flex flex-col items-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6
                          cursor-pointer group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Hover background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                
                <motion.div 
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative z-10
                            group-hover:bg-white/30 transition-all duration-300"
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  <Calendar className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </motion.div>
                <h3 className="font-semibold text-white text-lg relative z-10 group-hover:text-white/95 transition-colors duration-300" itemProp="name">
                  Free Consultation
                </h3>
                <p className="text-white/80 text-sm text-center relative z-10 group-hover:text-white/90 transition-colors duration-300" itemProp="description">
                  No commitment, just expert advice
                </p>
              </motion.article>
              
              <motion.article 
                className="flex flex-col items-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6
                          cursor-pointer group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  rotateY: -5,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Hover background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                
                <motion.div 
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative z-10
                            group-hover:bg-white/30 transition-all duration-300"
                  whileHover={{ 
                    rotate: [0, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  <Star className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </motion.div>
                <h3 className="font-semibold text-white text-lg relative z-10 group-hover:text-white/95 transition-colors duration-300" itemProp="name">
                  No Obligation Quote
                </h3>
                <p className="text-white/80 text-sm text-center relative z-10 group-hover:text-white/90 transition-colors duration-300" itemProp="description">
                  Transparent pricing, no hidden costs
                </p>
              </motion.article>
              
              <motion.article 
                className="flex flex-col items-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6
                          cursor-pointer group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.08, 
                  y: -8,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Hover background effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                
                <motion.div 
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative z-10
                            group-hover:bg-white/30 transition-all duration-300"
                  whileHover={{ 
                    rotate: [0, -15, 15, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  <Users className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </motion.div>
                <h3 className="font-semibold text-white text-lg relative z-10 group-hover:text-white/95 transition-colors duration-300" itemProp="name">
                  24/7 Support
                </h3>
                <p className="text-white/80 text-sm text-center relative z-10 group-hover:text-white/90 transition-colors duration-300" itemProp="description">
                  Always here when you need us
                </p>
              </motion.article>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
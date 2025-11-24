import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Rocket, Zap, Brain, Clock, Shield } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  const valueProps = [
    {
      icon: Code,
      title: 'Full-Stack Expertise',
      description: 'End-to-end development capabilities from frontend to backend in between.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      iconBg: 'bg-blue-500',
      keywords: ['full-stack development', 'frontend', 'backend', 'web development'],
      category: 'Development Services'
    },
    {
      icon: Rocket,
      title: 'Startup Friendly',
      description: 'Agile development approach perfect for startups and growing businesses.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      iconBg: 'bg-purple-500',
      keywords: ['startup development', 'agile methodology', 'business growth'],
      category: 'Business Solutions'
    },
    {
      icon: Zap,
      title: 'Agile Methodology',
      description: 'Fast iterations, continuous feedback, and rapid deployment cycles.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      iconBg: 'bg-orange-500',
      keywords: ['agile development', 'rapid deployment', 'continuous integration'],
      category: 'Development Process'
    },
    {
      icon: Brain,
      title: 'AI-Driven Solutions',
      description: 'Cutting-edge artificial intelligence integrated into every solution we build.',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      iconBg: 'bg-green-500',
      keywords: ['artificial intelligence', 'AI integration', 'machine learning'],
      category: 'Technology Innovation'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance for your peace of mind.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-500/10',
      iconBg: 'bg-indigo-500',
      keywords: ['24/7 support', 'technical maintenance', 'customer service'],
      category: 'Support Services'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security protocols and compliance standards in every project.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      iconBg: 'bg-red-500',
      keywords: ['enterprise security', 'data protection', 'compliance standards'],
      category: 'Security Solutions'
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
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
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      role="region"
      aria-labelledby="why-choose-us-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" role="presentation">
          <defs>
            <pattern id="hexagon" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 50,20 50,40 30,55 10,40 10,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" className="text-blue-600"/>
        </svg>
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
              id="why-choose-us-heading"
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
              itemProp="name"
            >
              Why Choose{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                itemProp="legalName"
              >
                Nesturelabs
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
              itemProp="description"
            >
              We combine technical excellence with business acumen to deliver solutions that drive real results
            </motion.p>
          </header>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Our competitive advantages and unique value propositions"
          >
            {valueProps.map((prop, index) => (
              <motion.article
                key={`advantage-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
                role="listitem"
                itemScope
                itemType="https://schema.org/Service"
                aria-labelledby={`advantage-title-${index}`}
                aria-describedby={`advantage-desc-${index}`}
              >
                <div className={`${prop.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 h-full relative overflow-hidden`}>
                  {/* Gradient overlay on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${prop.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                    aria-hidden="true"
                  ></div>
                  
                  <div className="relative z-10">
                    {/* Icon and Title container */}
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className={`w-16 h-16 ${prop.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
                        role="img"
                        aria-label={`${prop.title} icon`}
                      >
                        <prop.icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      
                      <h3 
                        id={`advantage-title-${index}`}
                        className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                        itemProp="name"
                      >
                        {prop.title}
                      </h3>
                    </div>
                    
                    <p 
                      id={`advantage-desc-${index}`}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                      itemProp="description"
                    >
                      {prop.description}
                    </p>
                    
                    {/* Progress bar for visual appeal */}
                    <div 
                      className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-label={`${prop.title} capability indicator`}
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${prop.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </div>

                    {/* Hidden SEO metadata */}
                    <meta itemProp="serviceType" content={prop.category} />
                    <meta itemProp="provider" content="Nesturelabs" />
                    <meta itemProp="areaServed" content="Global" />
                    <div className="sr-only">
                      <span itemProp="keywords">{prop.keywords.join(', ')}</span>
                    </div>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`particle-${index}-${i}`}
                        className={`absolute w-2 h-2 ${prop.iconBg} rounded-full opacity-20`}
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
                </div>
              </motion.article>
            ))}
          </div>

          {/* Hidden structured data for enhanced SEO */}
          <div className="sr-only" aria-hidden="true">
            <div itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Nesturelabs" />
              <meta itemProp="url" content="https://nesturelabs.com" />
              <meta itemProp="slogan" content="Technical excellence with business acumen" />
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <meta itemProp="addressCountry" content="LK" />
                <meta itemProp="addressRegion" content="Western Province" />
                <meta itemProp="addressLocality" content="Colombo" />
              </div>
              <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <meta itemProp="contactType" content="customer service" />
                <meta itemProp="hoursAvailable" content="24/7" />
                <meta itemProp="areaServed" content="Global" />
              </div>
            </div>
          </div>
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
            "description": "We combine technical excellence with business acumen to deliver solutions that drive real results",
            "url": "https://nesturelabs.com",
            "logo": "https://nesturelabs.com/logo.png",
            "slogan": "Technical excellence with business acumen",
            "foundingDate": "2020",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "LK",
              "addressRegion": "Western Province",
              "addressLocality": "Colombo"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "hoursAvailable": "Mo-Su 00:00-23:59",
              "areaServed": "Global",
              "availableLanguage": ["English", "Sinhala", "Tamil"]
            },
            "sameAs": [
              "https://linkedin.com/company/nesturelabs",
              "https://twitter.com/nesturelabs",
              "https://facebook.com/nesturelabs"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Solutions & Services",
              "itemListElement": valueProps.map((prop, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": prop.title,
                  "description": prop.description,
                  "category": prop.category,
                  "provider": {
                    "@type": "Organization",
                    "name": "Nesturelabs"
                  },
                  "areaServed": "Global",
                  "keywords": prop.keywords.join(', ')
                },
                "position": index + 1
              }))
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </section>
  );
};
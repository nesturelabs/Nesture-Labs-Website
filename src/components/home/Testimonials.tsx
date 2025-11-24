import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

// Define the Testimonial type
interface Testimonial {
  rating: number;
  name: string;
  role: string;
  company: string;
  content: string;
  date?: string;
  image: string;
}

// Structured data for SEO
const generateStructuredData = (testimonials: Testimonial[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "mainEntity": {
      "@type": "Organization",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
        "reviewCount": testimonials.length,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": testimonials.map(testimonial => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": testimonial.name,
          "jobTitle": testimonial.role,
          "worksFor": {
            "@type": "Organization",
            "name": testimonial.company
          }
        },
        "reviewBody": testimonial.content,
        "datePublished": testimonial.date || new Date().toISOString().split('T')[0]
      }))
    }
  };
};

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Memoize structured data to prevent unnecessary recalculations
  const structuredData = useMemo(() => generateStructuredData(testimonials), []);

  // Auto-play functionality with pause/resume
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Slightly longer for better UX

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Memoized navigation functions
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  const current = testimonials[currentIndex];
  const averageRating = useMemo(() => 
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
    []
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section 
        className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        aria-labelledby="testimonials-heading"
        role="region"
      >
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* SEO-optimized heading structure */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 
                id="testimonials-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300"
              >
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Clients Say</span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4 transition-colors duration-300">
                Don't just take our word for it - hear from our satisfied clients who have experienced the transformative power of our solutions.
              </p>
              
              {/* Rating summary for SEO */}
              <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1" aria-label={`Average rating: ${averageRating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(Number(averageRating)) 
                          ? 'text-yellow-500 dark:text-yellow-400 fill-current' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span>{averageRating}/5</span>
                <span>•</span>
                <span>{testimonials.length} reviews</span>
              </div>
            </motion.header>

            {/* Testimonials carousel */}
            <div className="relative" role="group" aria-label="Customer testimonials carousel">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 dark:opacity-10 rounded-2xl transition-opacity duration-300" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 dark:opacity-20 rounded-2xl blur-sm transition-opacity duration-300" aria-hidden="true"></div>
              
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/20 transition-all duration-300"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <Quote className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6 transition-colors duration-300" aria-hidden="true" />
                  
                  {/* Review content */}
                  <blockquote 
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300"
                    itemProp="reviewBody"
                  >
                    "{current.content}"
                  </blockquote>

                  {/* Star rating */}
                  <div 
                    className="flex items-center justify-center mb-6"
                    itemProp="reviewRating"
                    itemScope
                    itemType="https://schema.org/Rating"
                    role="img"
                    aria-label={`${current.rating} out of 5 stars`}
                  >
                    <meta itemProp="ratingValue" content={current.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                    <meta itemProp="worstRating" content="1" />
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-colors duration-300 ${
                          i < current.rating 
                            ? 'text-yellow-500 dark:text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Author information */}
                  <footer className="flex items-center justify-center space-x-4">
                    <img
                      src={current.image}
                      alt={`${current.name}, ${current.role} at ${current.company}`}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 transition-all duration-300"
                      loading="lazy"
                      width="64"
                      height="64"
                    />
                    <div className="text-left" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <h3 
                        className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300"
                        itemProp="name"
                      >
                        {current.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        <span itemProp="jobTitle">{current.role}</span> at{' '}
                        <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                          <span itemProp="name">{current.company}</span>
                        </span>
                      </p>
                    </div>
                  </footer>
                </motion.article>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between absolute top-4 right-4 gap-2 z-20">
                {/* Auto-play toggle */}
                <button
                  onClick={toggleAutoPlay}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 
                           text-gray-700 dark:text-gray-200 p-2 rounded-full 
                           border border-gray-200 dark:border-gray-600 
                           transition-all duration-300 hover:scale-105"
                  aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Previous/Next Navigation */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 
                           bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                           text-gray-700 dark:text-gray-200 p-2 md:p-3 rounded-full 
                           border border-gray-200 dark:border-gray-600 
                           shadow-md dark:shadow-gray-900/20
                           transition-all duration-300 z-10 
                           hover:shadow-lg hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-2 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 
                           bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                           text-gray-700 dark:text-gray-200 p-2 md:p-3 rounded-full 
                           border border-gray-200 dark:border-gray-600 
                           shadow-md dark:shadow-gray-900/20
                           transition-all duration-300 z-10 
                           hover:shadow-lg hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Pagination Dots */}
            <nav className="flex justify-center space-x-2 mt-8" aria-label="Testimonial pagination">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    index === currentIndex 
                      ? 'bg-blue-600 dark:bg-blue-400 shadow-md' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1} from ${testimonial.name}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </nav>

            {/* Screen reader only content for SEO */}
            <div className="sr-only">
              <h3>All Customer Reviews</h3>
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  <h4>{testimonial.name} - {testimonial.role} at {testimonial.company}</h4>
                  <p>Rating: {testimonial.rating} out of 5 stars</p>
                  <p>{testimonial.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
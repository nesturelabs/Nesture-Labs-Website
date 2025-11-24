import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter, Star, Users, Award, TrendingUp } from 'lucide-react';
import { projects } from '../data/projects';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroImages = [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['all', 'web', 'mobile', 'ai'];
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categoryLabels = {
    all: 'All Projects',
    web: 'Web Development',
    mobile: 'Mobile Apps',
    ai: 'AI Solutions'
  };

  const achievements = [
    { number: '100+', label: 'Projects Completed', icon: Award },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '98%', label: 'Success Rate', icon: TrendingUp },
    { number: '5.0', label: 'Average Rating', icon: Star }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nesturelabs Portfolio",
    "description": "Explore our portfolio of successful web development, mobile app, and AI solution projects.",
    "url": "https://nesturelabs.com/portfolio"
  };

  return (
    <>
      <SEOHead
        title="Portfolio - Our Best Work | Nesturelabs"
        description="Explore our portfolio of successful web development, mobile app, and AI solution projects. See how we've helped businesses transform digitally with cutting-edge technology."
        keywords="portfolio, web development projects, mobile app portfolio, AI solutions showcase, software development examples, Nesturelabs work"
        url="https://nesturelabs.com/portfolio"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image Slideshow */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: index === currentImageIndex ? 1 : 0,
                  scale: index === currentImageIndex ? 1 : 1.1
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={image}
                  alt={`Portfolio showcase ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-blue-900/75 to-purple-900/85 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Project Cards */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                style={{
                  width: Math.random() * 80 + 40,
                  height: Math.random() * 60 + 30,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, Math.random() * 10 - 5, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="portfolio-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="2" height="50" fill="currentColor" opacity="0.3"/>
                    <rect x="0" y="0" width="50" height="2" fill="currentColor" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#portfolio-grid)" className="text-purple-400"/>
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-6 mb-8"
              >
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Award Winning Projects</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">50+ Satisfied Clients</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-white">98% Success Rate</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-2">Our Amazing</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Portfolio
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Explore our latest projects and see how we've helped businesses transform digitally with innovative solutions that drive real results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <Button 
                  size="lg" 
                  icon={Filter} 
                  iconPosition="left"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  View All Projects
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  icon={ExternalLink}
                  iconPosition="right"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Your Project
                </Button>
              </motion.div>

              {/* Achievement Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    className="text-center backdrop-blur-lg rounded-xl p-6 border border-white/20 bg-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{achievement.number}</div>
                    <div className="text-sm lg:text-base text-gray-200">{achievement.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Image Slideshow Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Content */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Category Filter */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Projects</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'primary' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize transform hover:scale-105 transition-all duration-200"
                    >
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500/30 dark:hover:border-purple-400/30">
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                              <Button size="sm" variant="primary" icon={ExternalLink} className="flex-1">
                                View
                              </Button>
                              <Button size="sm" variant="outline" icon={Github} className="flex-1 border-white text-white hover:bg-white hover:text-gray-900">
                                Code
                              </Button>
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              project.category === 'web' ? 'bg-blue-500 text-white' :
                              project.category === 'mobile' ? 'bg-green-500 text-white' :
                              'bg-purple-500 text-white'
                            }`}>
                              {project.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{project.title}</h3>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
                          
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Client:</p>
                            <p className="text-sm text-gray-800 dark:text-gray-200">{project.client}</p>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Tech Stack:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Results:</p>
                            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                              {project.results.map((result, resultIndex) => (
                                <li key={resultIndex} className="flex items-center">
                                  <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20"></div>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 100 + 20,
                  height: Math.random() * 100 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold text-white mb-6"
              >
                Ready to Start Your Next Project?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-white/90 mb-8"
              >
                Let's discuss how we can help you achieve your goals with innovative technology solutions
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Get Free Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-blue hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  View More Projects
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
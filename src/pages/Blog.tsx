import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, Tag, ArrowRight, Search, BookOpen, TrendingUp, Clock, Eye } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const heroImages = [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const categories = ['all', 'AI', 'Mobile', 'Web', 'Cloud', 'Design', 'Security'];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const blogStats = [
    { number: '100+', label: 'Articles Published', icon: BookOpen },
    { number: '50K+', label: 'Monthly Readers', icon: Eye },
    { number: '25+', label: 'Expert Authors', icon: User },
    { number: '5.0', label: 'Average Rating', icon: TrendingUp }
  ];

  const featuredPost = blogPosts[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Nesturelabs Blog",
    "description": "Insights, tutorials, and thoughts on the latest in technology and development",
    "url": "https://nesturelabs.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Nesturelabs"
    }
  };

  return (
    <>
      <SEOHead
        title="Blog - Tech Insights & Tutorials | Nesturelabs"
        description="Stay updated with the latest insights, tutorials, and thoughts on technology, web development, mobile apps, AI, and digital transformation from Nesturelabs experts."
        keywords="tech blog, web development tutorials, mobile app insights, AI articles, technology trends, software development blog, digital transformation"
        url="https://nesturelabs.com/blog"
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
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={image}
                  alt={`Blog insights background ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-blue-900/75 to-green-900/85 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Blog Elements */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 90, 180],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {React.createElement(
                  [BookOpen, Tag, Calendar, User, Search, TrendingUp][Math.floor(Math.random() * 6)],
                  { className: "w-6 h-6" }
                )}
              </motion.div>
            ))}

            {/* Knowledge Network Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="blog-network" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                    <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.8"/>
                    <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="70" cy="10" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="10" cy="70" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="70" cy="70" r="2" fill="currentColor" opacity="0.6"/>
                    <line x1="40" y1="40" x2="10" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="40" y1="40" x2="70" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="40" y1="40" x2="10" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="40" y1="40" x2="70" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blog-network)" className="text-green-400"/>
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
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-white">100+ Articles</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">50K+ Readers</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Weekly Updates</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-2">Tech Insights &</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  Knowledge Hub
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                Stay ahead with the latest insights, tutorials, and expert thoughts on technology, development, and digital innovation from our team of experts.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <Button 
                  size="lg" 
                  icon={BookOpen} 
                  iconPosition="left"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Explore Articles
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  icon={Search}
                  iconPosition="left"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Search Topics
                </Button>
              </motion.div>

              {/* Blog Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {blogStats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center backdrop-blur-lg rounded-xl p-6 border border-white/20 bg-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm lg:text-base text-gray-200">{stat.label}</div>
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
                    ? 'bg-green-500 scale-125' 
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

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {category === 'all' ? 'All Topics' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Article</span>
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className="relative group">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        5 min read
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      className="transform hover:scale-105 transition-all duration-200"
                    >
                      Read Full Article
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Articles</span>
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(1).map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500/30 dark:hover:border-green-400/30">
                        <div className="relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {post.category}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                              5 min read
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {post.author}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-600"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                                +{post.tags.length - 2} more
                              </span>
                            )}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={ArrowRight}
                            iconPosition="right"
                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-0 group-hover:translate-x-1 transition-transform duration-200"
                          >
                            Read More
                          </Button>
                        </div>
                      </Card>
                    </motion.article>
                  ))}
                </div>
              </AnimatePresence>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 80 + 20,
                  height: Math.random() * 80 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
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
                className="text-3xl lg:text-4xl font-bold text-white mb-4"
              >
                Stay <span className="text-yellow-300">Updated</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-white/90 mb-8"
              >
                Subscribe to our newsletter for the latest insights, tutorials, and technology updates delivered to your inbox weekly
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <Button 
                  variant="secondary"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white/70 text-sm mt-4"
              >
                Join 10,000+ developers and tech enthusiasts. Unsubscribe anytime.
              </motion.p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
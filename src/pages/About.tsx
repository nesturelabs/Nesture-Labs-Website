import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target, Lightbulb, Award, MapPin, Calendar, Globe, Star, TrendingUp, Heart, Zap } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroImages = [
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const values = [
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'We put our clients at the center of everything we do, ensuring their success is our success.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that drive business growth and innovation.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to solve complex challenges.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project, from concept to deployment and beyond.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Nesturelabs was established with a vision to transform businesses through technology.',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      year: '2021',
      title: 'First 10 Clients',
      description: 'Successfully delivered projects for our first 10 clients across various industries.',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      year: '2022',
      title: 'AI Solutions Launch',
      description: 'Expanded our services to include cutting-edge AI and machine learning solutions.',
      icon: Lightbulb,
      color: 'from-purple-500 to-purple-600'
    },
    {
      year: '2023',
      title: 'Regional Expansion',
      description: 'Extended our reach across South Asia, serving clients in multiple countries.',
      icon: Globe,
      color: 'from-orange-500 to-orange-600'
    },
    {
      year: '2024',
      title: '50+ Projects',
      description: 'Milestone achievement of successfully completing over 50 projects.',
      icon: Award,
      color: 'from-red-500 to-red-600'
    }
  ];

  const aboutStats = [
    { number: '100+', label: 'Projects Delivered', icon: Award },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '5+', label: 'Years Experience', icon: Calendar },
    { number: '24/7', label: 'Support Available', icon: Zap }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Nesturelabs",
    "description": "Learn about Nesturelabs, a leading technology company in Sri Lanka specializing in web development, mobile apps, and AI solutions.",
    "url": "https://nesturelabs.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nesturelabs",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Charm Thiekshana"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="About Nesturelabs - Leading Tech Company in Sri Lanka"
        description="Learn about Nesturelabs, a leading technology company in Sri Lanka. Founded in 2020, we specialize in web development, mobile apps, and AI solutions. Meet our team and discover our story."
        keywords="about Nesturelabs, tech company Sri Lanka, software development team, company history, Charm Thiekshana, technology solutions"
        url="https://nesturelabs.com/about"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Enhanced Full-Screen Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                  alt={`About Nesturelabs team ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/85 via-purple-900/75 to-indigo-900/85 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Team Elements */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {React.createElement(
                  [Users, Target, Lightbulb, Award, Heart, Star, TrendingUp][Math.floor(Math.random() * 7)],
                  { className: "w-8 h-8" }
                )}
              </motion.div>
            ))}

            {/* Connection Network Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="about-network" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                    <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.8"/>
                    <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="100" cy="20" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="20" cy="100" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.6"/>
                    <line x1="60" y1="60" x2="20" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="60" y1="60" x2="100" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="60" y1="60" x2="20" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="60" y1="60" x2="100" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-network)" className="text-indigo-400"/>
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto py-16 lg:py-20 space-y-8 mb-16 lg:mb-20">
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-6 mb-8"
              >
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-white">Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Founded in 2020</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">10-50 Employees</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-2">About</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Nesturelabs
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                We're a team of passionate technologists building the future of digital experiences across Sri Lanka and beyond, transforming businesses through innovative technology solutions.
              </motion.p>

              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Our Story
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Meet the Team
                </motion.button>
              </motion.div> */}

              {/* About Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {aboutStats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center backdrop-blur-lg rounded-xl p-6 border border-white/20 bg-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
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
          {/* <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-indigo-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </section>

        {/* Company Story */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-pink-500 to-purple-700 opacity-10 rounded-full blur-2xl -z-10" />

          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="order-2 lg:order-1"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Story</span>
                  </h2>
                  <div className="space-y-5 text-gray-700 dark:text-gray-300">
                    <p className="text-lg leading-relaxed">
                      Founded in 2020, Nesturelabs emerged from a simple vision: to bridge the gap between
                      innovative technology and practical business solutions. We believe that great software
                      should not only work flawlessly but also inspire and delight users.
                    </p>
                    <p className="leading-relaxed">
                      Our journey began with a small team of developers who were passionate about creating
                      digital experiences that make a difference. Today, we've grown into a full-service
                      technology company that serves clients across Sri Lanka and the region.
                    </p>
                    <p className="leading-relaxed">
                      We're not just building software; we're crafting the digital future, one project at a time.
                      Our commitment to excellence, innovation, and client success drives everything we do.
                    </p>
                  </div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="order-1 lg:order-2 relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative group"
                  >
                    <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Nesturelabs team collaboration"
                      className="rounded-2xl shadow-2xl w-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Decorative Glow */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-30 blur-2xl z-0"></div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Company Timeline with Animations */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="timeline-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4"/>
                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#timeline-pattern)" className="text-indigo-600"/>
              </svg>
            </div>

            {/* Floating Timeline Elements */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-indigo-500/10 rounded-full"
                style={{
                  width: Math.random() * 60 + 20,
                  height: Math.random() * 60 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -25, 0],
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
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Journey</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  Key milestones in our growth and evolution
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full hidden lg:block"></div>
                
                {/* Animated Flow */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg"
                  animate={{
                    y: [0, 150, 300, 450, 600],
                    opacity: [1, 0.8, 0.6, 0.8, 1, 0]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="space-y-24">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                      <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                        <motion.div 
                          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <milestone.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{milestone.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{milestone.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300">{milestone.description}</p>
                          
                          {/* Progress indicator */}
                          <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${milestone.color} rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              transition={{ duration: 1.5, delay: index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="hidden lg:flex w-2/12 justify-center">
                        <motion.div
                          className={`w-20 h-20 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center border-4 border-white dark:border-gray-800 relative z-10 shadow-2xl`}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <milestone.icon className="w-10 h-10 text-white" />
                          
                          {/* Pulse effect */}
                          <motion.div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} opacity-30`}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="hidden lg:block w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="lg:hidden space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${milestone.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex-1 shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
                      
                      <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${milestone.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Values</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="text-center group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Team</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  The brilliant minds behind Nesturelabs
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Charm Thiekshana',
                    role: 'Founder & CEO',
                    image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
                    description: 'Visionary leader with 8+ years in software development and AI.',
                    linkedin: 'https://linkedin.com/in/charm-thiekshana'
                  },
                  {
                    name: 'Sarah Chen',
                    role: 'CTO',
                    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
                    description: 'Technical architect specializing in scalable cloud solutions.',
                    linkedin: 'https://linkedin.com/in/sarah-chen'
                  },
                  {
                    name: 'Michael Rodriguez',
                    role: 'Lead Designer',
                    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
                    description: 'Creative director with expertise in user-centered design.',
                    linkedin: 'https://linkedin.com/in/michael-rodriguez'
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 group hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative mb-4">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role} at Nesturelabs`}
                        className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{member.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{member.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Company Stats */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {[
                  { number: '100+', label: 'Projects Completed', color: 'from-indigo-600 to-indigo-700' },
                  { number: '50+', label: 'Happy Clients', color: 'from-purple-600 to-purple-700' },
                  { number: '5+', label: 'Years Experience', color: 'from-green-600 to-green-700' },
                  { number: '24/7', label: 'Support Available', color: 'from-orange-600 to-orange-700' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm lg:text-base font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
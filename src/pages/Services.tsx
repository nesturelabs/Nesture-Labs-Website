import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'lucide-react';
import { CheckCircle, Star, Users, Award, Zap } from 'lucide-react';
//import { ArrowRight, CheckCircle, Star, Users, Award, Zap } from 'lucide-react';
import { services } from '../data/services';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
//import { Button } from '../components/ui/Button';

export const Services: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroImages = [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const stats = [
    { number: '100+', label: 'Projects Delivered', icon: CheckCircle },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Zap }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Nesturelabs Services",
    "description": "Comprehensive technology solutions including web development, mobile apps, AI solutions, UI/UX design, and cloud services.",
    "provider": {
      "@type": "Organization",
      "name": "Nesturelabs"
    }
  };

  return (
    <>
      <SEOHead
        title="Our Services - Web, Mobile & AI Development | Nesturelabs"
        description="Comprehensive technology solutions including web development, mobile apps, AI solutions, UI/UX design, cloud services, and 24/7 support. Transform your business with cutting-edge technology."
        keywords="web development services, mobile app development, AI solutions, UI UX design, cloud services, software development Sri Lanka"
        url="https://nesturelabs.com/services"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
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
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={image}
                  alt={`Technology services background ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/75 to-blue-900/85 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Tech Icons */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {React.createElement(
                  [Icons.Code, Icons.Smartphone, Icons.Brain, Icons.Palette, Icons.Cloud, Icons.Shield][Math.floor(Math.random() * 6)],
                  { className: "w-8 h-8" }
                )}
              </motion.div>
            ))}

            {/* Circuit Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                  <pattern id="services-circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="80" cy="20" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="20" cy="80" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.6"/>
                    <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.8"/>
                    <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="20" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                    <line x1="80" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#services-circuit)" className="text-blue-400"/>
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
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">5.0 Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">50+ Happy Clients</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Award Winning</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="block mb-2">Comprehensive</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Technology Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              >
                From web development to AI solutions, we provide end-to-end technology services that accelerate your digital transformation and drive business growth.
              </motion.p>

              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <Button 
                  size="lg" 
                  icon={ArrowRight} 
                  iconPosition="right"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Explore Services
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Get Free Quote
                </Button>
              </motion.div> */}

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center backdrop-blur-lg rounded-xl p-6 border border-white/20 bg-white/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
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
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-blue-500 scale-125' 
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
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </section>

        {/* What We Bring Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                What We Bring to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Table</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                At Nesturelabs, we don’t just offer services — we deliver complete digital solutions that empower businesses to grow, compete, and lead.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up delay-100">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-500">
                <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovative Mindset</h3>
                <p className="text-gray-600 dark:text-gray-400">We approach every project with fresh ideas, ensuring your solution is truly one-of-a-kind.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-500">
                <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Client-Centric Process</h3>
                <p className="text-gray-600 dark:text-gray-400">You're involved at every step. We collaborate, adapt, and build what works best for your needs.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition duration-500">
                <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">End-to-End Expertise</h3>
                <p className="text-gray-600 dark:text-gray-400">From idea to launch and beyond, we’re with you — designing, developing, and supporting your vision.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                >
                  Comprehensive technology solutions designed to accelerate your digital transformation
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {services.map((service, index) => {
                  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500/30 dark:hover:border-blue-400/30">
                        <div className="flex items-start space-x-4 mb-6">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:animate-pulse"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                          Learn More
                        </Button> */}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Work</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  Our proven process ensures successful project delivery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { step: '01', title: 'Discovery', description: 'We understand your business goals and technical requirements', icon: Icons.Search },
                  { step: '02', title: 'Design', description: 'We create user-centered designs and technical architecture', icon: Icons.Palette },
                  { step: '03', title: 'Develop', description: 'We build your solution using best practices and modern technologies', icon: Icons.Code },
                  { step: '04', title: 'Test', description: 'We rigorously test to ensure quality and performance', icon: Icons.TestTube },
                  { step: '05', title: 'Deploy', description: 'We launch your solution with minimal downtime', icon: Icons.Rocket },
                  { step: '06', title: 'Support', description: 'We provide ongoing maintenance and support', icon: Icons.Headphones }
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">{process.step}</span>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <process.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{process.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{process.description}</p>
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
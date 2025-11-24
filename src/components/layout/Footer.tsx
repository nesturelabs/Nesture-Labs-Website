import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send, Check, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle subscription with Formspree
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscriptionStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setSubscriptionStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xzzvogwv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setMessage('Thank you for subscribing! We\'ll be in touch soon.');
        setEmail('');
      } else {
        setSubscriptionStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      console.error('Subscription error:', error);
    } finally {
      setIsSubscribing(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Web Development', path: '/services' },
        { name: 'Mobile Apps', path: '/services' },
        { name: 'AI Solutions', path: '/services' },
        { name: 'UI/UX Design', path: '/services' },
        { name: 'Cloud & DevOps', path: '/services' },
        { name: 'Support & Maintenance', path: '/services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/about' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Case Studies', path: '/portfolio' },
        { name: 'Tech Blog', path: '/blog' },
        { name: 'Documentation', path: '/docs' },
        { name: 'API Reference', path: '/api' },
        { name: 'Help Center', path: '/help' },
        { name: 'Community', path: '/community' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'GDPR Compliance', path: '/gdpr' },
        { name: 'Security', path: '/security' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/nesturelabs', 
      color: 'hover:text-blue-600',
      name: 'Facebook'
    },
    { 
      icon: Twitter, 
      href: 'https://twitter.com/nesturelabs', 
      color: 'hover:text-blue-400',
      name: 'Twitter'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/nesturelabs', 
      color: 'hover:text-blue-700',
      name: 'LinkedIn'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/nesturelabs', 
      color: 'hover:text-pink-600',
      name: 'Instagram'
    }
  ];

  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/5 rounded-full"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="footer-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-grid)" className="text-blue-400"/>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Company Info - Takes up more space */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo and Brand */}
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src="/favicon.svg" 
                    alt="Nesturelabs logo - Web Development and Digital Solutions"
                    className="w-28 h-28 drop-shadow-lg"
                    loading="lazy"
                    decoding="async"
                    width={112}
                    height={112}
                  />
                  <span className="text-2xl font-bold text-white">Nesturelabs</span>
                </div>

                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  Building the future with intelligent web, mobile, and AI solutions that scale with your business. We transform ideas into powerful digital experiences.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>info@nesturelabs.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>+94 779 753 202</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>Colombo, Sri Lanka</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg group`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-6 relative">
                      {section.title}
                      <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                        >
                          <Link
                            to={link.path}
                            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                          >
                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                            <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-12 border-t border-gray-800"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter for the latest insights, updates, and exclusive content
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubscribing}
                    className={`w-full bg-gray-800 text-gray-300 px-4 py-3 pl-12 rounded-lg border transition-all ${
                      subscriptionStatus === 'error' 
                        ? 'border-red-500 focus:ring-red-500' 
                        : subscriptionStatus === 'success'
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-700 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubscribing || !email.trim()}
                  whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
                  whileTap={{ scale: isSubscribing ? 1 : 0.95 }}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubscribing ? '' : 'hover:shadow-lg'
                  }`}
                >
                  {isSubscribing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : subscriptionStatus === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </div>
              
              {/* Status Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-3 rounded-lg flex items-center justify-center space-x-2 ${
                    subscriptionStatus === 'success'
                      ? 'bg-green-900/50 border border-green-600 text-green-300'
                      : 'bg-red-900/50 border border-red-600 text-red-300'
                  }`}
                >
                  {subscriptionStatus === 'success' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm">{message}</span>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span>&copy; {currentYear} Nesturelabs. All rights reserved.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};
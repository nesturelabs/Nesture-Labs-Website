// src/pages/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  Calendar,
  Video,
  AlertCircle
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { trackEvent } from '../utils/analytics';

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmissionStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setSubmissionStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // Using Formspree
      const response = await fetch('https://formspree.io/f/mzzvogzy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        // ✅ Track successful lead
        trackEvent('generate_lead', {
          method: 'contact_form',
          page_path: window.location.pathname
        });

        setSubmissionStatus('success');
        setStatusMessage(
          "Thank you for your message! We'll get back to you within 24 hours."
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmissionStatus('error');
        setStatusMessage(
          'Something went wrong. Please try again or contact us directly.'
        );
      }
    } catch (error) {
      setSubmissionStatus('error');
      setStatusMessage(
        'Network error. Please check your connection and try again.'
      );
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);

      // Clear status message after 7 seconds
      setTimeout(() => {
        setSubmissionStatus('idle');
        setStatusMessage('');
      }, 7000);
    }
  };

  const openWhatsApp = () => {
    trackEvent('whatsapp_click', {
      page_path: window.location.pathname,
      source: 'contact_page_quick_action'
    });

    window.open(
      "https://wa.me/94779753202?text=Hello! I'm interested in your services.",
      '_blank'
    );
  };

  const openCalendly = () => {
    trackEvent('schedule_call_click', {
      page_path: window.location.pathname,
      source: 'contact_page_quick_action'
    });

    window.open(
      'https://calendly.com/nesturelabs/consultation',
      '_blank'
    );
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: "Send us an email and we'll respond within 24 hours",
      contact: 'info@nesturelabs.com',
      action: 'mailto:info@nesturelabs.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours',
      contact: '+94 77 975 3202',
      action: 'tel:+94779753202',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Quick chat on WhatsApp for instant responses',
      contact: 'Chat with us',
      action: openWhatsApp,
      color: 'from-green-400 to-green-500'
    },
    {
      icon: Video,
      title: 'Video Call',
      description: 'Schedule a free consultation call with our experts',
      contact: 'Book a meeting',
      action: openCalendly,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer 24/7 support and maintenance packages to ensure your solution runs smoothly after launch.'
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'We work with modern technologies including React, Node.js, Flutter, Python, AI/ML frameworks, and cloud platforms.'
    },
    {
      question: 'Can you work with our existing team?',
      answer:
        'Absolutely! We can integrate with your existing team or work as an extension of your development capabilities.'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Nesturelabs',
    description:
      'Get in touch with Nesturelabs for web development, mobile apps, and AI solutions. Multiple ways to reach us including phone, email, WhatsApp, and video calls.',
    url: 'https://nesturelabs.com/contact'
  };

  return (
    <>
      <SEOHead
        title="Contact Nesturelabs - Get Your Free Consultation Today"
        description="Contact Nesturelabs for web development, mobile apps, and AI solutions. Multiple ways to reach us including phone, email, WhatsApp, and video calls. Free consultation available."
        keywords="contact Nesturelabs, free consultation, web development contact, mobile app development Sri Lanka, AI solutions contact, software development inquiry"
        url="https://nesturelabs.com/contact"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Contact Nesturelabs team"
              className="w-full h-full object-cover opacity-10"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 dark:from-gray-900/80 dark:to-gray-800/80"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Get In{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Touch
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Ready to start your project? Let's discuss how we can help you
                achieve your goals with cutting-edge technology solutions
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                    24h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Response Time
                  </div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">
                    Free
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Consultation
                  </div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Clients
                  </div>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Support
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Multiple Ways to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Connect
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  Choose the communication method that works best for you
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      // 🔍 Track click based on method
                      if (method.title === 'Email Us') {
                        trackEvent('email_click', {
                          page_path: window.location.pathname,
                          source: 'contact_methods_card'
                        });
                      } else if (method.title === 'Call Us') {
                        trackEvent('phone_click', {
                          page_path: window.location.pathname,
                          source: 'contact_methods_card'
                        });
                      } else if (method.title === 'WhatsApp') {
                        trackEvent('whatsapp_click', {
                          page_path: window.location.pathname,
                          source: 'contact_methods_card'
                        });
                      } else if (method.title === 'Video Call') {
                        trackEvent('schedule_call_click', {
                          page_path: window.location.pathname,
                          source: 'contact_methods_card'
                        });
                      }

                      if (typeof method.action === 'string') {
                        window.open(method.action, '_blank');
                      } else if (typeof method.action === 'function') {
                        method.action();
                      }
                    }}
                  >
                    <Card className="p-6 h-full text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/30">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {method.description}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {method.contact}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Let's Connect
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Email
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          info@nesturelabs.com
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          support@nesturelabs.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Phone
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          +94 77 975 3202
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          +94 72 975 5955
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Office
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Innovation Drive
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Colombo 03, Sri Lanka
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Office Hours
                    </h4>
                    <div className="space-y-2">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            {schedule.day}
                          </span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      icon={MessageSquare}
                      className="w-full"
                      onClick={openWhatsApp}
                    >
                      WhatsApp Chat
                    </Button>
                    <Button
                      variant="outline"
                      icon={Calendar}
                      className="w-full"
                      onClick={openCalendly}
                    >
                      Schedule Video Call
                    </Button>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Send us a message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className={`w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-4 py-3 rounded-lg border transition-all ${
                              submissionStatus === 'error' &&
                              !formData.name.trim()
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                            } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className={`w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-4 py-3 rounded-lg border transition-all ${
                              submissionStatus === 'error' &&
                              (!formData.email.trim() ||
                                !isValidEmail(formData.email))
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                            } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="+94 77 975 3202"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select a subject</option>
                            <option value="web-development">
                              Web Development
                            </option>
                            <option value="mobile-app">
                              Mobile App Development
                            </option>
                            <option value="ai-solutions">
                              AI Solutions
                            </option>
                            <option value="ui-ux-design">UI/UX Design</option>
                            <option value="consultation">
                              Free Consultation
                            </option>
                            <option value="support">
                              Technical Support
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          disabled={isSubmitting}
                          className={`w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-4 py-3 rounded-lg border transition-all ${
                            submissionStatus === 'error' &&
                            !formData.message.trim()
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                          } focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                          placeholder="Tell us about your project or how we can help you..."
                        />
                      </div>

                      {/* Status Message */}
                      {statusMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`p-4 rounded-lg flex items-center space-x-3 ${
                            submissionStatus === 'success'
                              ? 'bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-600 text-green-800 dark:text-green-300'
                              : 'bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-600 text-red-800 dark:text-red-300'
                          }`}
                        >
                          {submissionStatus === 'success' ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium">
                            {statusMessage}
                          </span>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 min-h-[48px]"
                        disabled={isSubmitting}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending Message...</span>
                            </>
                          ) : submissionStatus === 'success' ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span>Message Sent!</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Send Message</span>
                            </>
                          )}
                        </span>
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Frequently Asked{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Questions
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                  Quick answers to common questions about our services
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Location
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Remote team based in Sri Lanka
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126108.83834648926!2d79.861243!3d6.927078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1691759427"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

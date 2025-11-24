import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xeoznkgp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setCurrentStep(1);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            projectType: '',
            budget: '',
            timeline: '',
            message: ''
          });
        }, 3000);
      } else {
        console.error('Form submission failed:', response.statusText);
        // Optionally handle error UI here
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle error UI here
    }
  };

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'AI/ML Solutions',
    'UI/UX Design',
    'E-commerce Platform',
    'Custom Software',
    'Other'
  ];

  const budgetRanges = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Let\'s discuss'
  ];

  const timelines = [
    '1-2 months',
    '3-4 months',
    '5-6 months',
    '6+ months',
    'Flexible'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Get Your Quote</h2>
                <p className="text-blue-100">Tell us about your project</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Step {currentStep} of 3
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {Math.round((currentStep / 3) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  initial={{ width: '33%' }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <User className="w-4 h-4 inline mr-2" />
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="Your full name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Mail className="w-4 h-4 inline mr-2" />
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Phone className="w-4 h-4 inline mr-2" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="+94 77 975 3202"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Briefcase className="w-4 h-4 inline mr-2" />
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="Your company"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Details */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Project Details
                        </h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Type *
                          </label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="">Select project type</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Budget Range
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="">Select budget range</option>
                              {budgetRanges.map((budget) => (
                                <option key={budget} value={budget}>{budget}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              <Calendar className="w-4 h-4 inline mr-2" />
                              Timeline
                            </label>
                            <select
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="">Select timeline</option>
                              {timelines.map((timeline) => (
                                <option key={timeline} value={timeline}>{timeline}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Project Description */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Tell Us More
                        </h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <MessageSquare className="w-4 h-4 inline mr-2" />
                            Project Description *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Describe your project, goals, and any specific requirements..."
                          />
                        </div>
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Quote Submitted!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Thank you for your interest. We'll get back to you within 24 hours with a detailed quote.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      This window will close automatically...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="disabled:opacity-50"
                >
                  Previous
                </Button>
                
                <div className="flex space-x-3">
                  {currentStep < 3 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && (!formData.name || !formData.email)) ||
                        (currentStep === 2 && !formData.projectType)
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      icon={Send}
                      iconPosition="right"
                      disabled={!formData.message}
                    >
                      Submit Quote Request
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with AI-powered recommendations and real-time analytics.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'web',
    client: 'RetailTech Inc.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    results: ['300% increase in sales', '50% reduction in cart abandonment', '99.9% uptime']
  },
  {
    id: 'fitness-mobile-app',
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app with AI-powered workout recommendations and social features.',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'mobile',
    client: 'FitLife Solutions',
    techStack: ['Flutter', 'Firebase', 'TensorFlow', 'Google Fit API'],
    results: ['1M+ downloads', '4.8 star rating', '85% user retention']
  },
  {
    id: 'ai-chatbot',
    title: 'AI Customer Support Bot',
    description: 'Intelligent chatbot with natural language processing and multi-language support.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ai',
    client: 'TechSupport Pro',
    techStack: ['Python', 'TensorFlow', 'OpenAI API', 'React', 'WebSocket'],
    results: ['80% query resolution', '60% reduction in support tickets', '24/7 availability']
  },
  {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    description: 'Real-time financial data visualization platform with advanced analytics and reporting.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'web',
    client: 'FinanceFlow Corp',
    techStack: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Docker'],
    results: ['40% faster decision making', '95% data accuracy', '200+ daily active users']
  },
  {
    id: 'healthcare-app',
    title: 'Telemedicine Platform',
    description: 'Secure video consultation platform with patient management and prescription system.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'mobile',
    client: 'HealthConnect',
    techStack: ['React Native', 'WebRTC', 'Node.js', 'MongoDB', 'AWS'],
    results: ['10,000+ consultations', '98% patient satisfaction', 'HIPAA compliant']
  },
  {
    id: 'smart-inventory',
    title: 'AI Inventory Management',
    description: 'Machine learning-powered inventory optimization system with predictive analytics.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'ai',
    client: 'LogiSmart Solutions',
    techStack: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Kubernetes'],
    results: ['30% cost reduction', '99% stock accuracy', '50% faster processing']
  }
];
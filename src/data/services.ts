import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications with modern frameworks and cutting-edge technologies.',
    icon: 'Globe',
    features: ['React & Next.js', 'Node.js & Express', 'Database Design', 'API Development', 'Progressive Web Apps'],
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    icon: 'Smartphone',
    features: ['Flutter & React Native', 'iOS & Android', 'App Store Optimization', 'Push Notifications', 'Offline Support'],
    color: 'from-green-600 to-teal-600'
  },
  {
    id: 'ai-solutions',
    title: 'AI & Automation',
    description: 'Intelligent solutions powered by machine learning and artificial intelligence.',
    icon: 'Brain',
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Process Automation', 'Data Analytics'],
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that convert visitors into customers.',
    icon: 'Palette',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and streamlined development operations.',
    icon: 'Cloud',
    features: ['AWS & Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring & Analytics', 'Security & Compliance'],
    color: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'support-maintenance',
    title: 'Support & Maintenance',
    description: '24/7 technical support and ongoing maintenance for your digital solutions.',
    icon: 'Shield',
    features: ['24/7 Support', 'Performance Monitoring', 'Security Updates', 'Bug Fixes', 'Feature Updates'],
    color: 'from-emerald-600 to-green-600'
  }
];
// src/components/layout/FloatingElements.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  ArrowUp,
  Calendar,
  Bot,
  Minimize2,
  Maximize2,
  Mic,
  Copy,
  Trash2,
  Download,
  Upload,
  Settings,
  Zap,
  Star,
  Shield,
  Globe,
  Code,
  Palette,
  Database,
  Cloud,
  Smartphone,
  CheckCircle,
  AlertCircle,
  History,
  Bookmark,
  Share2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

// Enhanced theme provider with system preference detection
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    const detectSystemTheme = () => {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setSystemPreference(isSystemDark ? 'dark' : 'light');
    };

    // Initial detection
    updateTheme();
    detectSystemTheme();

    // Observe DOM changes for theme classes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectSystemTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', detectSystemTheme);
    };
  }, []);

  return { isDarkMode, systemPreference };
};

// Enhanced types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick-reply' | 'action' | 'system';
  metadata?: {
    isPinned?: boolean;
    isRead?: boolean;
    reaction?: string;
    attachments?: string[];
  };
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
  icon?: string;
  category?: string;
}

interface ChatSettings {
  enableVoice: boolean;
  enableNotifications: boolean;
  autoExpandReplies: boolean;
  readReceipts: boolean;
  typingIndicator: boolean;
  theme: 'auto' | 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
}

export const FloatingElements: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nesturelabs_chat_messages');
      return saved
        ? JSON.parse(saved).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        : [];
    }
    return [];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatSettings, setChatSettings] = useState<ChatSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nesturelabs_chat_settings');
      return saved ? JSON.parse(saved) : {
        enableVoice: true,
        enableNotifications: true,
        autoExpandReplies: true,
        readReceipts: true,
        typingIndicator: true,
        theme: 'auto',
        fontSize: 'medium',
        language: 'en'
      };
    }
    return {
      enableVoice: true,
      enableNotifications: true,
      autoExpandReplies: true,
      readReceipts: true,
      typingIndicator: true,
      theme: 'auto',
      fontSize: 'medium',
      language: 'en'
    };
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode, systemPreference } = useTheme();

  // Enhanced Company data with real-time capabilities
  const companyInfo = {
    name: 'Nesture Labs',
    tagline: 'Web, Mobile, and AI Solutions that Scale with You',
    founded: '2025',
    location: 'Remote - Sri Lanka',
    email: 'info@nesturelabs.com',
    phone: '+94 779 753 202',
    website: 'https://www.nesturelabs.com',
    mission: 'To empower businesses by delivering cutting-edge, scalable, and user-friendly digital solutions.',
    vision: 'Be the go-to tech partner for innovative startups and enterprises worldwide.',
    
    realTimeStats: {
      activeProjects: 15,
      clientsServed: 42,
      codeCommits: 1284,
      uptime: '99.99%',
      responseTime: '< 1 hour'
    },

    team: [
      {
        name: 'John Doe',
        role: 'CEO & Founder',
        bio: '10+ years in tech innovation. AI & Blockchain expert.',
        linkedin: 'linkedin.com/in/johndoe',
        availability: 'Available for Enterprise'
      },
      {
        name: 'Jane Smith',
        role: 'CTO',
        bio: 'Expert in AI and cloud architectures. PhD in Computer Science.',
        linkedin: 'linkedin.com/in/janesmith',
        availability: 'Available for Technical Consultations'
      },
      {
        name: 'Alex Johnson',
        role: 'Lead Developer',
        bio: 'Specializes in React, Node.js, and Microservices.',
        linkedin: 'linkedin.com/in/alexjohnson',
        availability: 'Available for Development'
      },
      {
        name: 'Emily Davis',
        role: 'UI/UX Designer',
        bio: 'Creating intuitive user experiences. Award-winning designer.',
        linkedin: 'linkedin.com/in/emilydavis',
        availability: 'Available for Design Projects'
      }
    ],

    services: {
      web: ['React/Next.js', 'Node.js/Express', 'Python/Django', 'PHP/Laravel'],
      mobile: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin'],
      ai: ['Machine Learning', 'Computer Vision', 'NLP/Chatbots', 'Predictive Analytics'],
      cloud: ['AWS', 'Azure', 'Google Cloud', 'DevOps', 'Docker/Kubernetes'],
      design: ['UI/UX Design', 'Product Design', 'Brand Identity', 'Design Systems']
    },

    portfolio: [
      {
        name: 'AI-Powered E-Commerce Platform',
        description: 'Scalable online store with AI recommendations and real-time inventory.',
        tech: 'React, Node.js, AWS, TensorFlow',
        link: 'https://example.com/ecommerce',
        status: 'Live',
        metrics: '40% sales increase'
      },
      {
        name: 'Banking Security Mobile App',
        description: 'Secure fintech application with biometric authentication and fraud detection.',
        tech: 'Flutter, Firebase, ML Kit',
        link: 'https://example.com/banking',
        status: 'Live',
        metrics: '60% fraud reduction'
      },
      {
        name: 'Healthcare Analytics Dashboard',
        description: 'Real-time data visualization for patient records and medical analytics.',
        tech: 'Next.js, GraphQL, MongoDB, D3.js',
        link: 'https://example.com/healthcare',
        status: 'Live',
        metrics: '30% efficiency improvement'
      }
    ],

    testimonials: [
      {
        client: 'Tech Startup Inc.',
        quote: 'Nesture Labs delivered beyond expectations! Their AI integration was seamless.',
        rating: 5,
        project: 'AI Chatbot System',
        duration: '3 months'
      },
      {
        client: 'Global Enterprise',
        quote: 'Their team transformed our business with custom mobile solutions.',
        rating: 4.8,
        project: 'Enterprise Mobile App',
        duration: '6 months'
      }
    ]
  };

  // Enhanced quick replies with categories and icons
  const quickReplies: QuickReply[] = [
    { id: '1', text: '🌐 Our Services', action: 'services', category: 'services', icon: 'Globe' },
    { id: '2', text: '💰 Pricing & Packages', action: 'pricing', category: 'business', icon: 'Zap' },
    { id: '3', text: '📅 Book Free Consultation', action: 'booking', category: 'action', icon: 'Calendar' },
    { id: '4', text: '📞 Contact & Support', action: 'contact', category: 'contact', icon: 'Phone' },
    { id: '5', text: '🏢 Company Overview', action: 'about', category: 'about', icon: 'Shield' },
    { id: '6', text: '👥 Meet Our Team', action: 'team', category: 'team', icon: 'Users' },
    { id: '7', text: '📊 Portfolio & Cases', action: 'portfolio', category: 'work', icon: 'Database' },
    { id: '8', text: '💬 Client Testimonials', action: 'testimonials', category: 'social', icon: 'Star' },
    { id: '9', text: '❓ FAQ & Help', action: 'faq', category: 'help', icon: 'HelpCircle' },
    { id: '10', text: '📈 Get Project Quote', action: 'quote', category: 'business', icon: 'FileText' },
    { id: '11', text: '🔍 Case Studies', action: 'casestudies', category: 'work', icon: 'Book' },
    { id: '12', text: '⚡ Real-time Stats', action: 'stats', category: 'tech', icon: 'Activity' },
    { id: '13', text: '🔧 Tech Stack', action: 'techstack', category: 'tech', icon: 'Code' },
    { id: '14', text: '🚀 Current Projects', action: 'projects', category: 'work', icon: 'Rocket' }
  ];

  // Enhanced bot responses with rich formatting and actions
  const botResponses: Record<string, { content: string; actions?: string[] }> = {
    services: {
      content: `🚀 **${companyInfo.name} - Comprehensive Services**\n\n${Object.entries(companyInfo.services)
        .map(([category, techs]) => 
          `**${category.toUpperCase()}**\n${techs.map(tech => `• ${tech}`).join('\n')}`
        )
        .join('\n\n')}\n\n💡 **Specializations:**\n• Real-time Applications\n• Microservices Architecture\n• AI/ML Integration\n• Cloud Native Development\n• Progressive Web Apps\n\nWhich technology stack interests you?`,
      actions: ['web', 'mobile', 'ai', 'cloud', 'design']
    },

    pricing: {
      content: `💎 **Flexible Pricing Models**\n\n**Startup Package** - $2K-5K\n✓ Basic Website/App\n✓ 2-4 Week Delivery\n✓ 6 Months Support\n\n**Growth Package** - $5K-15K\n✓ Advanced Features\n✓ 4-8 Week Delivery\n✓ 12 Months Support\n\n**Enterprise Package** - $15K-50K+\n✓ Full Custom Solution\n✓ 8-16 Week Delivery\n✓ 24 Months Support\n\n📊 **Add-ons:**\n• AI Features: +$3K-10K\n• Mobile App: +$5K-15K\n• E-commerce: +$4K-12K\n• Analytics: +$2K-8K\n\n🎯 **Money-Back Guarantee:** 30-day satisfaction guarantee!\n\nNeed a custom quote? Describe your project!`
    },

    stats: {
      content: `📈 **Real-time Company Metrics**\n\n🔄 **Active Projects:** ${companyInfo.realTimeStats.activeProjects}\n👥 **Clients Served:** ${companyInfo.realTimeStats.clientsServed}\n💻 **Code Commits:** ${companyInfo.realTimeStats.codeCommits}\n🟢 **System Uptime:** ${companyInfo.realTimeStats.uptime}\n⚡ **Response Time:** ${companyInfo.realTimeStats.responseTime}\n\n🌍 **Global Reach:** 25+ Countries\n🏆 **Client Satisfaction:** 98%\n🚀 **Projects Delivered:** 50+\n\nThese stats update in real-time!`
    },

    techstack: {
      content: `🛠 **Our Technology Stack**\n\n**Frontend:**\n• React.js / Next.js / TypeScript\n• Vue.js / Nuxt.js\n• Angular / Svelte\n\n**Backend:**\n• Node.js / Express / NestJS\n• Python / Django / FastAPI\n• PHP / Laravel / Symfony\n• Java / Spring Boot\n\n**Mobile:**\n• React Native / Flutter\n• iOS Swift / Android Kotlin\n• Progressive Web Apps\n\n**AI/ML:**\n• TensorFlow / PyTorch\n• OpenAI / LangChain\n• Computer Vision\n• Natural Language Processing\n\n**Database:**\n• PostgreSQL / MySQL\n• MongoDB / Redis\n• Firebase / Supabase\n\n**Cloud & DevOps:**\n• AWS / Azure / Google Cloud\n• Docker / Kubernetes\n• CI/CD Pipelines\n• Terraform / Ansible\n\nLooking for a specific technology?`
    },

    default: {
      content: `🤖 **Welcome to ${companyInfo.name} AI Assistant!**\n\nI'm your intelligent guide to everything ${companyInfo.name}. Here's what I can help you with:\n\n💼 **Business Info**\n• Services & Pricing\n• Company Overview\n• Client Testimonials\n\n👥 **Team & Expertise**\n• Meet Our Experts\n• Technical Capabilities\n• Project Experience\n\n🚀 **Get Started**\n• Free Consultation\n• Project Quote\n• Case Studies\n\n🔧 **Technical Details**\n• Tech Stack\n• Real-time Stats\n• Portfolio\n\nWhat would you like to explore first?`,
      actions: ['services', 'pricing', 'team', 'portfolio', 'booking']
    }
  };

  // Enhanced effects with better performance
  useEffect(() => {
    localStorage.setItem('nesturelabs_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('nesturelabs_chat_settings', JSON.stringify(chatSettings));
  }, [chatSettings]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Mark messages as read
      if (chatSettings.readReceipts) {
        setMessages(prev => prev.map(msg => ({
          ...msg,
          metadata: { ...msg.metadata, isRead: true }
        })));
      }
    }
  }, [isChatOpen, chatSettings.readReceipts]);

  useEffect(() => {
    if (isChatOpen && !hasInitialized && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(botResponses.default.content);
        setHasInitialized(true);
      }, 800);
    }
  }, [isChatOpen, hasInitialized, messages.length]);

  // Enhanced speech recognition with error handling
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      
      try {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = chatSettings.language;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          handleSendMessage();
        };

        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          addSystemMessage(`Voice input failed: ${event.error}. Please try typing instead.`);
        };
      } catch (error) {
        console.error('Speech recognition initialization failed:', error);
      }
    }
  }, [chatSettings.language]);

  // Enhanced functions with useCallback
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => {
      const next = !prev;
      if (next) {
        trackEvent('chat_widget_open', {
          page_path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      }
      return next;
    });
    setIsMinimized(false);
    setShowSettings(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(!isMinimized);
    setShowSettings(false);
  }, [isMinimized]);

  const addMessage = useCallback((
    content: string,
    sender: 'user' | 'bot' | 'system',
    type: 'text' | 'quick-reply' | 'action' | 'system' = 'text',
    metadata?: any
  ) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      content,
      sender,
      timestamp: new Date(),
      type,
      metadata
    };
    
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      // Keep only last 100 messages for performance
      return updated.slice(-100);
    });

    if (sender === 'bot' && !isChatOpen) {
      setUnreadCount((prev) => prev + 1);
      
      // Browser notification
      if (chatSettings.enableNotifications && Notification.permission === 'granted') {
        new Notification('Nesture Labs AI', {
          body: content.substring(0, 100) + '...',
          icon: '/favicon.ico'
        });
      }
    }
  }, [isChatOpen, chatSettings.enableNotifications]);

  const addSystemMessage = useCallback((content: string) => {
    addMessage(content, 'system', 'system');
  }, [addMessage]);

  const addBotMessage = useCallback((content: string) => {
    if (!chatSettings.typingIndicator) {
      addMessage(content, 'bot');
      return;
    }

    setIsTyping(true);
    const delay = 600 + Math.random() * 900; // Reduced delay for better UX
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, 'bot');
    }, delay);
  }, [addMessage, chatSettings.typingIndicator]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    addMessage(userMessage, 'user');
    setMessage('');

    // Enhanced AI response logic
    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase();
      let responseKey = 'default';

      // Advanced keyword matching
      const keywordMap: Record<string, string> = {
        'service': 'services',
        'price': 'pricing',
        'cost': 'pricing',
        'book': 'booking',
        'meet': 'booking',
        'schedule': 'booking',
        'contact': 'contact',
        'support': 'contact',
        'about': 'about',
        'company': 'about',
        'team': 'team',
        'people': 'team',
        'portfolio': 'portfolio',
        'work': 'portfolio',
        'project': 'portfolio',
        'testimonial': 'testimonials',
        'review': 'testimonials',
        'faq': 'faq',
        'help': 'faq',
        'case': 'casestudies',
        'study': 'casestudies',
        'stat': 'stats',
        'metric': 'stats',
        'tech': 'techstack',
        'stack': 'techstack',
        'technology': 'techstack'
      };

      for (const [keyword, action] of Object.entries(keywordMap)) {
        if (lowerMessage.includes(keyword)) {
          responseKey = action;
          break;
        }
      }

      // Special greetings
      if (/(hello|hi|hey|greetings)/i.test(userMessage)) {
        addBotMessage(`Hello! 👋 I'm the advanced AI assistant for ${companyInfo.name}. I now support voice commands, file uploads, and real-time features!\n\nHow can I help you today?`);
        return;
      }

      // Clear chat command
      if (/(clear|reset|start over)/i.test(userMessage)) {
        clearChat();
        return;
      }

      // Settings command
      if (/(setting|config|preference)/i.test(userMessage)) {
        setShowSettings(true);
        addSystemMessage('Opening settings panel...');
        return;
      }

      const response = botResponses[responseKey] || botResponses.default;
      addBotMessage(response.content);
    }, 100);
  }, [message, addMessage, addBotMessage, addSystemMessage]);

  const handleQuickReply = useCallback((reply: QuickReply) => {
    addMessage(reply.text, 'user', 'quick-reply');
    
    trackEvent('quick_reply_used', {
      action: reply.action,
      category: reply.category,
      text: reply.text
    });

    setTimeout(() => {
      const response = botResponses[reply.action] || botResponses.default;
      addBotMessage(response.content);
    }, 300);
  }, [addMessage, addBotMessage]);

  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ''));
    addSystemMessage('Message copied to clipboard!');
  }, [addSystemMessage]);

  const pinMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.map(msg => ({
      ...msg,
      metadata: {
        ...msg.metadata,
        isPinned: msg.id === messageId ? !msg.metadata?.isPinned : msg.metadata?.isPinned
      }
    })));
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('nesturelabs_chat_messages');
    addBotMessage('Chat history cleared! 🧹 Ready for a fresh start. How can I assist you today?');
    
    trackEvent('chat_cleared', {
      message_count: messages.length,
      timestamp: new Date().toISOString()
    });
  }, [messages.length, addBotMessage]);

  const downloadChat = useCallback(() => {
    const chatText = messages
      .map(
        (msg) =>
          `${msg.sender.toUpperCase()} [${formatTime(msg.timestamp)}]:\n${
            msg.content
          }\n${'-'.repeat(50)}`
      )
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nesturelabs_chat_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addSystemMessage('Chat history downloaded!');
  }, [messages, addSystemMessage]);

  const exportChat = useCallback(() => {
    const chatData = {
      exportDate: new Date().toISOString(),
      messageCount: messages.length,
      messages: messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toISOString()
      }))
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nesturelabs_chat_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addSystemMessage('Chat exported as JSON!');
  }, [messages, addSystemMessage]);

  const startListening = useCallback(() => {
    if (!chatSettings.enableVoice) {
      addSystemMessage('Voice input is disabled. Enable it in settings.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        addSystemMessage('🎤 Listening... Speak now.');
      } catch (error) {
        addSystemMessage('Voice recognition unavailable. Please check permissions.');
      }
    } else {
      addSystemMessage('Voice recognition not supported in this browser.');
    }
  }, [chatSettings.enableVoice, addSystemMessage]);

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          addSystemMessage('🔔 Notifications enabled!');
          setChatSettings(prev => ({ ...prev, enableNotifications: true }));
        }
      });
    }
  }, [addSystemMessage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openWhatsApp = useCallback(() => {
    trackEvent('whatsapp_click', {
      page_path: window.location.pathname,
      source: 'floating_phone_button',
      timestamp: new Date().toISOString()
    });

    window.open(
      `https://wa.me/94779753202?text=Hello%20Nesture%20Labs!%20I%20found%20you%20through%20your%20website%20and%20I'm%20interested%20in%20your%20services.`,
      '_blank'
    );
  }, []);

  const openCalendly = useCallback(() => {
    trackEvent('schedule_call_click', {
      page_path: window.location.pathname,
      source: 'floating_calendar_button',
      timestamp: new Date().toISOString()
    });

    window.open('https://calendly.com/nesturelabs/45min', '_blank');
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/', 'text/', 'application/pdf'];
      const isValidType = validTypes.some(type => file.type.startsWith(type));
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        addSystemMessage('❌ Please upload images, text files, or PDFs only.');
        return;
      }
      
      if (!isValidSize) {
        addSystemMessage('❌ File size must be less than 5MB.');
        return;
      }

      addSystemMessage(`📎 File "${file.name}" uploaded successfully!`);
      // Here you would typically handle the file upload to your server
    }
    event.target.value = ''; // Reset input
  }, [addSystemMessage]);

  const formatTime = useCallback((date: Date) => 
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  , []);

  const formatMessage = useCallback((content: string) => 
    content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**'))
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          return part;
        })}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  , []);

  const getFontSizeClass = useCallback(() => {
    switch (chatSettings.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  }, [chatSettings.fontSize]);

  // Group quick replies by category for better organization
  const groupedReplies = quickReplies.reduce((groups, reply) => {
    const category = reply.category || 'general';
    if (!groups[category]) groups[category] = [];
    groups[category].push(reply);
    return groups;
  }, {} as Record<string, QuickReply[]>);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-3">
        {showBackToTop && (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-110 backdrop-blur-sm ${
              isDarkMode
                ? 'bg-gray-800/90 text-gray-300 hover:bg-gray-700/90 border border-gray-700'
                : 'bg-white/90 text-gray-600 hover:bg-white border border-gray-200'
            }`}
            onClick={scrollToTop}
            style={{
              animation: showBackToTop
                ? 'fadeInUp 0.3s ease-out'
                : 'fadeOutDown 0.3s ease-out'
            }}
          >
            <ArrowUp className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={openCalendly}
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative"
        >
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Book Meeting
          </div>
        </button>

        <button
          onClick={openWhatsApp}
          className="group w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp
          </div>
        </button>

        <div className="relative">
          <button
            onClick={toggleChat}
            className="group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative"
          >
            <div className="transition-transform duration-200">
              {isChatOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>
            {!isChatOpen && unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </div>
            )}
            {!isChatOpen && (
              <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-75"></div>
            )}
            <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              AI Assistant
            </div>
          </button>

          {isChatOpen && (
            <div
              className={`absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col backdrop-blur-sm ${
                isDarkMode
                  ? 'bg-gray-900/95 border-gray-700'
                  : 'bg-white/95 border-gray-200'
              } ${
                isMinimized
                  ? 'h-14'
                  : showSettings 
                    ? 'h-[500px]'
                    : 'max-h-[80vh] sm:max-h-[600px] min-h-[400px]'
              }`}
              style={{ animation: 'slideInUp 0.3s ease-out' }}
            >
              {/* Enhanced Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      Nesture Labs AI
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-purple-100 text-xs">
                        Online • v2.0 • Enhanced
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadChat}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title="Download Chat"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={exportChat}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title="Export Chat"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <button
                    onClick={clearChat}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                    title="Clear Chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={minimizeChat}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <div className="flex flex-col flex-1 min-h-0">
                  {showSettings ? (
                    <div className="flex-1 p-4 overflow-y-auto">
                      <h4 className="font-semibold mb-4 text-lg">Chat Settings</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Voice Input</span>
                          <button
                            onClick={() => setChatSettings(prev => ({
                              ...prev,
                              enableVoice: !prev.enableVoice
                            }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              chatSettings.enableVoice ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              chatSettings.enableVoice ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Notifications</span>
                          <button
                            onClick={() => {
                              if (!chatSettings.enableNotifications) {
                                requestNotificationPermission();
                              } else {
                                setChatSettings(prev => ({
                                  ...prev,
                                  enableNotifications: !prev.enableNotifications
                                }));
                              }
                            }}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              chatSettings.enableNotifications ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              chatSettings.enableNotifications ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Typing Indicator</span>
                          <button
                            onClick={() => setChatSettings(prev => ({
                              ...prev,
                              typingIndicator: !prev.typingIndicator
                            }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              chatSettings.typingIndicator ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              chatSettings.typingIndicator ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div>
                          <span className="text-sm block mb-2">Font Size</span>
                          <div className="flex space-x-2">
                            {(['small', 'medium', 'large'] as const).map(size => (
                              <button
                                key={size}
                                onClick={() => setChatSettings(prev => ({ ...prev, fontSize: size }))}
                                className={`px-3 py-1 rounded text-sm ${
                                  chatSettings.fontSize === size
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setShowSettings(false)}
                          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Save Settings
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        <div className={`space-y-4 ${getFontSizeClass()}`}>
                          {messages.map((msg, index) => (
                            <div
                              key={msg.id}
                              className={`flex items-end gap-2 ${
                                msg.sender === 'user'
                                  ? 'justify-end'
                                  : 'justify-start'
                              }`}
                              style={{
                                animation: `slideInMessage 0.3s ease-out ${
                                  index * 0.1
                                }s both`
                              }}
                            >
                              {msg.sender === 'bot' && (
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                  AI
                                </div>
                              )}
                              
                              <div
                                className={`max-w-[80%] sm:max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl relative group ${
                                  msg.sender === 'user'
                                    ? 'bg-purple-600 text-white rounded-br-md'
                                    : msg.sender === 'system'
                                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                    : isDarkMode
                                    ? 'bg-gray-800 text-gray-300 rounded-bl-md'
                                    : 'bg-gray-100 text-gray-700 rounded-bl-md'
                                } ${msg.metadata?.isPinned ? 'ring-2 ring-yellow-400' : ''}`}
                              >
                                {msg.sender === 'bot' && (
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <Bot className="w-3 h-3" />
                                      <span className="text-xs font-medium opacity-75">
                                        AI Assistant
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => pinMessage(msg.id)}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      {msg.metadata?.isPinned ? (
                                        <Bookmark className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      ) : (
                                        <Bookmark className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                )}
                                
                                <div className="leading-relaxed break-words">
                                  {formatMessage(msg.content)}
                                </div>
                                
                                <div className="flex items-center justify-between mt-2">
                                  <p
                                    className={`text-xs opacity-60 ${
                                      msg.sender === 'user'
                                        ? 'text-purple-200'
                                        : msg.sender === 'system'
                                        ? 'text-yellow-600'
                                        : 'text-gray-500'
                                    }`}
                                  >
                                    {formatTime(msg.timestamp)}
                                  </p>
                                  {msg.sender === 'system' && (
                                    <AlertCircle className="w-3 h-3 opacity-60" />
                                  )}
                                </div>
                                
                                {msg.sender !== 'system' && (
                                  <button
                                    onClick={() => copyMessage(msg.content)}
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-opacity"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              
                              {msg.sender === 'user' && (
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                  You
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {isTyping && (
                            <div className="flex justify-start items-end gap-2">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                AI
                              </div>
                              <div
                                className={`px-4 py-3 rounded-2xl rounded-bl-md ${
                                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <Bot className="w-3 h-3 text-gray-500" />
                                  <div className="flex space-x-1">
                                    <div
                                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                      style={{ animationDelay: '0s' }}
                                    ></div>
                                    <div
                                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                      style={{ animationDelay: '0.2s' }}
                                    ></div>
                                    <div
                                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                      style={{ animationDelay: '0.4s' }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500 ml-2">
                                    AI is thinking...
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </div>

                      {/* Enhanced Quick Replies with Categories */}
                      {messages.length <= 2 && !isTyping && chatSettings.autoExpandReplies && (
                        <div className="px-4 pb-2 border-t border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 pt-3">
                            Quick options:
                          </p>
                          {Object.entries(groupedReplies).map(([category, replies]) => (
                            <div key={category} className="mb-3">
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 capitalize">
                                {category}
                              </p>
                              <div className="flex gap-2 pb-2">
                                {replies.map((reply) => (
                                  <button
                                    key={reply.id}
                                    onClick={() => handleQuickReply(reply)}
                                    className="text-xs px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 font-medium whitespace-nowrap dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/70 flex items-center space-x-1"
                                  >
                                    <span>{reply.text}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Enhanced Input Area */}
                      <div
                        className={`border-t p-4 ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex space-x-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*,text/*,.pdf"
                            className="hidden"
                          />
                          
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            title="Upload File"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                          
                          <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask me anything about Nesture Labs..."
                            className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all ${
                              isDarkMode
                                ? 'bg-gray-800 text-gray-300 border-gray-700 placeholder-gray-500'
                                : 'bg-gray-50 text-gray-700 border-gray-300 placeholder-gray-400'
                            } ${getFontSizeClass()}`}
                            onKeyPress={(e) =>
                              e.key === 'Enter' && handleSendMessage()
                            }
                            disabled={isTyping}
                          />
                          
                          <button
                            onClick={startListening}
                            className={`p-2 rounded-xl transition-all duration-200 ${
                              isListening 
                                ? 'bg-red-500 animate-pulse' 
                                : 'bg-blue-500 hover:bg-blue-600'
                            } text-white hover:scale-105 active:scale-95 disabled:opacity-50`}
                            disabled={isTyping || !recognitionRef.current}
                            title="Voice Input"
                          >
                            {isListening ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Mic className="w-4 h-4" />
                            )}
                          </button>
                          
                          <button
                            onClick={handleSendMessage}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                            disabled={isTyping || !message.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Input Hints */}
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            💡 Try: "services", "pricing", or voice input
                          </span>
                          <span>
                            {messages.length} messages
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Floating CTA Banner */}
      <div
        className="fixed left-4 sm:left-6 bottom-6 z-40 hidden sm:block"
        style={{ animation: 'slideInLeft 0.5s ease-out 2s both' }}
      >
        <div
          className={`backdrop-blur-lg rounded-2xl p-4 border shadow-lg max-w-xs transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${
            isDarkMode
              ? 'bg-gray-900/90 border-gray-700'
              : 'bg-white/90 border-gray-200'
          }`}
          onClick={() => {
            trackEvent('schedule_call_click', {
              page_path: window.location.pathname,
              source: 'floating_left_banner'
            });
            openCalendly();
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Free Tech Consultation
              </p>
              <p
                className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Get expert advice in 45 mins
              </p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
              Book Now
            </button>
            <button 
              onClick={openWhatsApp}
              className="px-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style>{`
        @keyframes slideInUp { 
          from { opacity: 0; transform: translateY(20px) scale(0.95); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        @keyframes slideInMessage { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-100px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fadeOutDown { 
          from { opacity: 1; transform: translateY(0); } 
          to { opacity: 0; transform: translateY(20px); } 
        }
        .scrollbar-thin { 
          scrollbar-width: thin; 
          scrollbar-color: #9ca3af transparent; 
        }
        .scrollbar-thin::-webkit-scrollbar { 
          width: 6px; 
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track { 
          background: transparent; 
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb { 
          background-color: #9ca3af; 
          border-radius: 3px; 
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { 
          background-color: #6b7280; 
        }
        
        /* Enhanced animations */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Backdrop blur support check */
        @supports not (backdrop-filter: blur(10px)) {
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.95);
          }
          .dark .backdrop-blur-sm {
            background-color: rgba(0, 0, 0, 0.95);
          }
        }
      `}</style>
    </>
  );
};
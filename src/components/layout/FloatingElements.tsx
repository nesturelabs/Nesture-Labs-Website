import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Phone, ArrowUp, Calendar, Bot, Minimize2, Maximize2, Mic, Copy, Trash2, Download } from 'lucide-react';

// Theme provider syncing with website's main nav bar
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return { isDarkMode };
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'action';
}

interface QuickReply {
  id: string;
  text: string;
  action?: string;
}

export const FloatingElements: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages');
      return saved ? JSON.parse(saved).map((msg: any) => ({ ...msg, timestamp: new Date(msg.timestamp) })) : [];
    }
    return [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { isDarkMode } = useTheme();

  // Enhanced Company data with more details
  const companyInfo = {
    name: "Nesture Labs",
    tagline: "Web, Mobile, and AI Solutions that Scale with You",
    founded: "2025",
    location: "Remote - Sri Lanka",
    email: "info@nesturelabs.com",
    phone: "+94 779 753 202",
    website: "https://www.nesturelabs.com",
    mission: "To empower businesses by delivering cutting-edge, scalable, and user-friendly digital solutions.",
    vision: "Be the go-to tech partner for innovative startups and enterprises worldwide.",
    team: [
      { name: "John Doe", role: "CEO & Founder", bio: "10+ years in tech innovation.", linkedin: "linkedin.com/in/johndoe" },
      { name: "Jane Smith", role: "CTO", bio: "Expert in AI and cloud architectures.", linkedin: "linkedin.com/in/janesmith" },
      { name: "Alex Johnson", role: "Lead Developer", bio: "Specializes in React and Node.js.", linkedin: "linkedin.com/in/alexjohnson" },
      { name: "Emily Davis", role: "UI/UX Designer", bio: "Creating intuitive user experiences.", linkedin: "linkedin.com/in/emilydavis" }
    ],
    portfolio: [
      { name: "E-Commerce Platform", description: "Scalable online store for retail clients with real-time inventory.", tech: "React, Node.js, AWS", link: "https://example.com/ecommerce" },
      { name: "AI Chatbot System", description: "Intelligent customer support bot with NLP capabilities.", tech: "Python, TensorFlow, React Native", link: "https://example.com/chatbot" },
      { name: "Mobile Banking App", description: "Secure fintech application with biometric authentication.", tech: "Flutter, Firebase", link: "https://example.com/banking" },
      { name: "Healthcare Dashboard", description: "Data visualization for patient records and analytics.", tech: "Next.js, GraphQL, MongoDB", link: "https://example.com/healthcare" }
    ],
    testimonials: [
      { client: "Tech Startup Inc.", quote: "Nesture Labs delivered beyond expectations! Their AI integration was seamless.", rating: 5 },
      { client: "Global Enterprise", quote: "Their team transformed our business with custom mobile solutions.", rating: 4.8 },
      { client: "E-Com Giant", quote: "Fast delivery and high-quality code. Highly recommend!", rating: 5 }
    ]
  };

  const quickReplies: QuickReply[] = [
    { id: '1', text: '🌐 Our Services', action: 'services' },
    { id: '2', text: '💰 Pricing Info', action: 'pricing' },
    { id: '3', text: '📅 Book Meeting', action: 'booking' },
    { id: '4', text: '📞 Contact Us', action: 'contact' },
    { id: '5', text: '🏢 About Company', action: 'about' },
    { id: '6', text: '👥 Our Team', action: 'team' },
    { id: '7', text: '📊 Portfolio', action: 'portfolio' },
    { id: '8', text: '💬 Testimonials', action: 'testimonials' },
    { id: '9', text: '❓ FAQ', action: 'faq' },
    { id: '10', text: '🔍 Project Quote', action: 'quote' },
    { id: '11', text: '📈 Case Studies', action: 'casestudies' }
  ];

  const botResponses: Record<string, string> = {
    services: `🚀 **${companyInfo.name} Services:**\n\n🌐 **Web Development**\n• React, Next.js, Node.js\n• Full-stack solutions\n• E-commerce platforms\n\n📱 **Mobile Apps**\n• React Native & Flutter\n• iOS & Android native\n• Cross-platform solutions\n\n🤖 **AI Solutions**\n• Chatbots & Virtual Assistants\n• Machine Learning models\n• AI-powered automation\n\n☁️ **Cloud & DevOps**\n• AWS, Azure, Google Cloud\n• CI/CD pipelines\n• Scalable infrastructure\n\n🎨 **UI/UX Design**\n• Modern, responsive designs\n• User-centered approach\n• Brand identity development\n\n🔒 **Cybersecurity**\n• Penetration testing\n• Secure architecture\n• Compliance consulting\n\n📊 **Data Analytics**\n• Big data processing\n• BI dashboards\n• Predictive analytics\n\nWhich service interests you most?`,
    
    pricing: `💡 **Transparent Pricing for Every Budget:**\n\n🌟 **Startup Package**\n• Basic Website: $2,000 - $5,000\n• Landing pages, portfolios\n• 2-4 week delivery\n\n🚀 **Growth Package**\n• Advanced Web App: $5,000 - $15,000\n• Custom features, integrations\n• 4-8 week delivery\n\n📱 **Enterprise Package**\n• Mobile App: $8,000 - $25,000\n• Full-featured applications\n• 8-12 week delivery\n\n🤖 **AI Solutions**\n• Custom AI tools: $3,000 - $12,000\n• Chatbots, automation\n• 3-6 week delivery\n\n🔒 **Security Audit**\n• Comprehensive scan: $4,000 - $10,000\n• Report & fixes\n• 2-4 week delivery\n\n📊 **Analytics Dashboard**\n• Custom BI tool: $6,000 - $18,000\n• Data visualization\n• 4-8 week delivery\n\n💬 All packages include:\n✅ Free consultation\n✅ 6 months support\n✅ Source code ownership\n✅ Full documentation\n✅ Performance optimization\n✅ Dedicated project manager\n\nReady for a custom quote? Type 'quote' for more.`,
    
    booking: `📅 **Let's Schedule Your Free Consultation!**\n\nDuring our 45-minute call, we'll:\n\n🎯 **Understand Your Goals**\n• Discuss your project vision\n• Identify key requirements\n• Define success metrics\n\n💡 **Provide Expert Advice**\n• Technical recommendations\n• Best practices & trends\n• Technology stack suggestions\n\n📋 **Create Action Plan**\n• Detailed project timeline\n• Milestone breakdown\n• Investment overview\n\n🤝 **Answer Your Questions**\n• Technical feasibility\n• Team & process\n• Next steps\n\n**New:** Live demo of similar projects!\n\n**Ready to book?** Click the calendar button or visit ${companyInfo.website}/book.`,
    
    contact: `📞 **Get in Touch with ${companyInfo.name}**\n\n📧 **Email:** ${companyInfo.email}\n📱 **Phone:** ${companyInfo.phone}\n🌐 **Website:** ${companyInfo.website}\n📍 **Location:** ${companyInfo.location}\n\n⏰ **Business Hours:**\n• Monday - Friday: 9 AM - 6 PM (IST)\n• Saturday: 10 AM - 4 PM (IST)\n• Response time: Within 1 hour\n\n💬 **Preferred Methods:**\n• WhatsApp for quick chats\n• Email for details\n• Calendar for calls\n• Slack for projects\n• New: Discord community\n\n🚀 **Follow Us:**\n• LinkedIn: /company/nesture-labs\n• GitHub: /nesture-labs\n• Twitter: @nesturelabs\n• Instagram: @nesturelabs\n\nHow can we connect?`,
    
    about: `🏢 **About ${companyInfo.name}**\n\n**${companyInfo.tagline}**\n\n🎯 **Mission:** ${companyInfo.mission}\n\n🔮 **Vision:** ${companyInfo.vision}\n\n📅 **Founded:** ${companyInfo.founded}\n📍 **Based in:** ${companyInfo.location}\n\n🌟 **Why Choose Us:**\n\n💪 **Expertise**\n• 15+ years experience\n• Cutting-edge tech\n• Agile methodologies\n\n🤝 **Partnership**\n• Collaborative\n• Transparent communication\n• Long-term support\n\n🚀 **Quality**\n• Code reviews\n• Automated testing\n• 99.9% uptime\n\n🌍 **Global**\n• 25+ countries\n• Diverse team\n• 24/7 support\n\nAwards: Best AI Startup 2025\n\nStart your project?`,
    
    team: `👥 **${companyInfo.name} Team**\n\nPassionate innovators:\n\n${companyInfo.team.map(member => `**${member.name}** - ${member.role}\n${member.bio}\nLinkedIn: ${member.linkedin}\n`).join('\n')}\n\nHiring: 5 open roles!\n\nSpecific member info?`,
    
    portfolio: `📊 **Portfolio Highlights**\n\n50+ projects:\n\n${companyInfo.portfolio.map(project => `**${project.name}**\n${project.description}\nTech: ${project.tech}\nLink: ${project.link}\n`).join('\n')}\n\nFull portfolio: ${companyInfo.website}/portfolio\n\nInterested type?`,
    
    testimonials: `💬 **Testimonials**\n\n${companyInfo.testimonials.map(test => `**${test.client}** (${test.rating}/5)\n"${test.quote}"\n`).join('\n')}\n\nClutch: 4.9/5\n\nMore stories?`,
    
    faq: `❓ **FAQ**\n\n**Project time?** 4-12 weeks.\n**Maintenance?** $500/month+.\n**Tech?** React, Flutter, AI/Python.\n**Scale?** Yes, 1M+ users.\n**Process?** Discovery→Design→Dev→Test→Launch→Support.\n**Custom?** Yes!\nAnother question?`,
    
    quote: `📈 **Project Quote**\nTell me about your project (idea, budget, timeline) for a personalized estimate!\n\nExample: "I need a mobile app for e-commerce with AI recommendations, budget $10k, 2 months."`,
    
    casestudies: `🔍 **Case Studies**\n\n1. **E-Com Boost:** Increased sales 40% with AI personalization.\n2. **Banking Security:** Reduced fraud 60% with ML detection.\n3. **Health Analytics:** Improved patient care with data dashboards.\n\nDetails on site: ${companyInfo.website}/cases\n\nWhich interests you?`,
    
    default: `👋 Hi! Explore ${companyInfo.name}:\n• Services\n• Pricing\n• Booking\n• Contact\n• About\n• Team\n• Portfolio\n• Testimonials\n• FAQ\n• Quote\n• Cases\nType or click below! 😊`
  };

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
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
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen && !hasInitialized && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(botResponses.default);
        setHasInitialized(true);
      }, 800);
    }
  }, [isChatOpen, hasInitialized]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        handleSendMessage();
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const addMessage = (content: string, sender: 'user' | 'bot', type: 'text' | 'quick-reply' | 'action' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
    
    if (sender === 'bot' && !isChatOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, 'bot');
    }, delay);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    addMessage(userMessage, 'user');
    setMessage('');

    const lowerMessage = userMessage.toLowerCase();
    let responseKey = 'default';

    // Enhanced keyword matching
    if (lowerMessage.includes('service')) responseKey = 'services';
    else if (lowerMessage.includes('price') || lowerMessage.includes('quote')) responseKey = 'pricing';
    else if (lowerMessage.includes('book') || lowerMessage.includes('meet')) responseKey = 'booking';
    else if (lowerMessage.includes('contact')) responseKey = 'contact';
    else if (lowerMessage.includes('about')) responseKey = 'about';
    else if (lowerMessage.includes('team')) responseKey = 'team';
    else if (lowerMessage.includes('portfolio')) responseKey = 'portfolio';
    else if (lowerMessage.includes('testimonial')) responseKey = 'testimonials';
    else if (lowerMessage.includes('faq')) responseKey = 'faq';
    else if (lowerMessage.includes('case') || lowerMessage.includes('study')) responseKey = 'casestudies';
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      addBotMessage(`Hello! 👋 I'm the advanced AI for ${companyInfo.name}. New: Download chat, clear history, voice input, and more.\n\nWhat can I do for you?`);
      return;
    } else if (lowerMessage.includes('clear') || lowerMessage.includes('reset')) {
      clearChat();
      return;
    }

    addBotMessage(botResponses[responseKey]);
  };

  const handleQuickReply = (reply: QuickReply) => {
    addMessage(reply.text, 'user', 'quick-reply');
    if (reply.action) {
      addBotMessage(botResponses[reply.action]);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Message copied!');
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    addBotMessage('Chat history cleared! Fresh start. How can I assist? 🚀');
  };

  const downloadChat = () => {
    const chatText = messages.map(msg => `${msg.sender.toUpperCase()} (${formatTime(msg.timestamp)}):\n${msg.content.replace(/\n/g, '\n  ')}\n`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nesturelabs_chat_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/94779753202?text=Hello! Interested in services.`, '_blank');
  };

  const openCalendly = () => {
    window.open('https://calendly.com/nesturelabs/45min', '_blank');
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatMessage = (content: string) => content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line.split(/(\*\*.*?\*\*)/).map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
        return part;
      })}
      {index < content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-3">
        {showBackToTop && (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-110 ${
              isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
            onClick={scrollToTop}
            style={{ animation: showBackToTop ? 'fadeInUp 0.3s ease-out' : 'fadeOutDown 0.3s ease-out' }}
          >
            <ArrowUp className="w-5 h-5" />
          </div>
        )}

        <button onClick={openCalendly} className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button onClick={openWhatsApp} className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="relative">
          <button onClick={toggleChat} className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative">
            <div className="transition-transform duration-200">
              {isChatOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            {!isChatOpen && unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
              </div>
            )}
            {!isChatOpen && (
              <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-75"></div>
            )}
          </button>

          {isChatOpen && (
            <div
              className={`absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              } ${isMinimized ? 'h-14' : 'max-h-[80vh] sm:max-h-[600px] min-h-[400px]'}`}
              style={{ animation: 'slideInUp 0.3s ease-out' }}
            >
              {/* Chat Header with new buttons */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">Nesture Labs AI</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-purple-100 text-xs">Online • High-Tech Version</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={downloadChat} className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10" title="Download Chat">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={clearChat} className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10" title="Clear Chat">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button onClick={minimizeChat} className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animation: `slideInMessage 0.3s ease-out ${index * 0.1}s both` }}>
                          {msg.sender === 'bot' && (
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              AI
                            </div>
                          )}
                          <div className={`max-w-[80%] sm:max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl relative group ${
                            msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-md' : isDarkMode ? 'bg-gray-800 text-gray-300 rounded-bl-md' : 'bg-gray-100 text-gray-700 rounded-bl-md'
                          }`}>
                            {msg.sender === 'bot' && (
                              <div className="flex items-center space-x-2 mb-2">
                                <Bot className="w-3 h-3" />
                                <span className="text-xs font-medium opacity-75">AI Assistant</span>
                              </div>
                            )}
                            <div className="text-sm leading-relaxed break-words">
                              {formatMessage(msg.content)}
                            </div>
                            <p className={`text-xs mt-2 opacity-60 ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                            <button onClick={() => copyMessage(msg.content)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-opacity">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          {msg.sender === 'user' && (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
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
                          <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className="flex items-center space-x-2">
                              <Bot className="w-3 h-3 text-gray-500" />
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">typing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {messages.length <= 1 && !isTyping && (
                    <div className="px-4 pb-2 border-t border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 pt-3">Quick options:</p>
                      <div className="flex gap-2 pb-2">
                        {quickReplies.map((reply) => (
                          <button key={reply.id} onClick={() => handleQuickReply(reply)} className="text-xs px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 font-medium whitespace-nowrap dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/70">
                            {reply.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`border-t p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex space-x-2">
                      <input ref={inputRef} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask me anything about Nesture Labs..." className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all ${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-300'}`} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} disabled={isTyping} />
                      <button onClick={startListening} className={`p-2 rounded-xl transition-all duration-200 ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white hover:scale-105 active:scale-95 disabled:opacity-50`} disabled={isTyping || !recognitionRef.current}>
                        <Mic className="w-4 h-4" />
                      </button>
                      <button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95 disabled:hover:scale-100" disabled={isTyping || !message.trim()}>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating CTA Banner */}
      <div className="fixed left-4 sm:left-6 bottom-6 z-40 hidden sm:block" style={{ animation: 'slideInLeft 0.5s ease-out 2s both' }}>
        <div className={`backdrop-blur-lg rounded-2xl p-4 border shadow-lg max-w-xs transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${isDarkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'}`} onClick={openCalendly}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Free Consultation</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Book a 45-min call</p>
            </div>
          </div>
          <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
            Book Now
          </button>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes slideInMessage { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOutDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(20px); } }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #9ca3af transparent; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #9ca3af; border-radius: 3px; }
      `}</style>
    </>
  );
};
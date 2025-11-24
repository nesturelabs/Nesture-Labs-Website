import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BrandLogosSection = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    success: 0,
    experience: 0
  });


  // Animate counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const targets = { projects: 100, clients: 50, success: 99, experience: 5 };
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounters({
          projects: Math.floor(targets.projects * easeOutQuart),
          clients: Math.floor(targets.clients * easeOutQuart),
          success: Math.floor(targets.success * easeOutQuart),
          experience: Math.floor(targets.experience * easeOutQuart)
        });

        if (step >= steps) {
          clearInterval(interval);
          setCounters(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Web development company brands with colorful SVG logos
  const brands = [
    {
      name: "Vercel",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#000000" d="M12 0L24 20H0L12 0z"/>
        </svg>
      )
    },
    {
      name: "Netlify",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#00C7B7" d="M12.876 1.985l6.718 6.718a1.5 1.5 0 0 1 0 2.122l-6.718 6.718a1.5 1.5 0 0 1-2.122 0L4.036 10.825a1.5 1.5 0 0 1 0-2.122L10.754 1.985a1.5 1.5 0 0 1 2.122 0z"/>
          <path fill="#00AD9F" d="M12 4.5L19.5 12L12 19.5L4.5 12L12 4.5z"/>
        </svg>
      )
    },
    {
      name: "Stripe",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#635BFF" d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.409 1.401-1.01.912-1.516 2.133-1.516 3.696 0 2.756 1.919 4.089 5.523 5.394 1.496.556 2.204 1.178 2.204 1.934 0 .711-.547 1.089-1.626 1.089-1.626 0-3.848-.711-5.327-1.445l-.713 4.155c1.178.556 3.114 1.334 6.175 1.334 1.87 0 3.403-.489 4.409-1.401.984-.889 1.494-2.133 1.494-3.652-.022-3.379-2.049-4.554-5.859-5.657"/>
        </svg>
      )
    },
    {
      name: "Shopify",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#95BF47" d="M15.337 2.793c-.069-.003-.138-.003-.207-.003-1.337 0-2.675.207-4.013.621-.069-.138-.207-.276-.345-.345-.621-.414-1.379-.483-2.069-.207-2.344.931-4.619 3.724-5.516 6.895-.552 1.862-.069 3.311.897 3.931.138.069.276.138.414.138 1.31 4.274 4.205 6.895 7.378 6.895.414 0 .828-.069 1.241-.138 2.482-.483 4.274-2.344 5.171-4.894.414-1.103.552-2.207.552-3.31 0-2.207-.621-4.205-1.724-5.724-.345-.483-.828-.897-1.379-1.31-.483-.345-1.034-.621-1.655-.828-.207-.069-.483-.138-.745-.138zm-1.103 1.586c.345.069.621.138.897.276.621.276 1.172.69 1.586 1.241.897 1.241 1.379 2.827 1.379 4.481 0 .966-.138 1.931-.483 2.827-.759 2.207-2.207 3.793-4.274 4.205-.345.069-.69.138-1.034.138-2.689 0-5.171-2.207-6.274-5.862-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621-.069-.207-.138-.414-.207-.621v-.069c.897-2.827 2.896-5.309 4.964-6.102.414-.138.828-.207 1.241-.207.138 0 .276 0 .414.069z"/>
        </svg>
      )
    },
    {
      name: "Figma",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#F24E1E" d="M15.5 0H12v7.5h3.5A3.5 3.5 0 1 0 15.5 0z"/>
          <path fill="#A259FF" d="M8.5 0H12v7.5H8.5A3.5 3.5 0 1 1 8.5 0z"/>
          <path fill="#19BCF7" d="M12 12A3.5 3.5 0 1 0 15.5 8.5H12V12z"/>
          <path fill="#09CF83" d="M8.5 24A3.5 3.5 0 0 0 12 20.5v-4H8.5a3.5 3.5 0 0 0 0 7z"/>
          <path fill="#FF7262" d="M8.5 16.5H12V8.5H8.5a3.5 3.5 0 0 0 0 7z"/>
        </svg>
      )
    },
    {
      name: "Supabase",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#3ECF8E" d="M21.362 9.354H12V21.616c0 .904.954 1.342 1.53.704l8.962-9.96a.5.5 0 0 0-.13-.806z"/>
          <path fill="#3ECF8E" fillOpacity=".2" d="M2.638 14.646H12V2.384c0-.904-.954-1.342-1.53-.704L1.508 11.64a.5.5 0 0 0 .13.806z"/>
        </svg>
      )
    },
    {
      name: "Prisma",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#5A67D8" d="M21.807 18.285L13.553.757a1.324 1.324 0 0 0-1.129-.755 1.31 1.31 0 0 0-1.044.664L2.828 16.769a1.305 1.305 0 0 0-.163 1.151 1.312 1.312 0 0 0 .695.948l8.644 4.108c.815.387 1.766-.21 1.766-1.107l-.04-7.896 3.132-7.135L21.807 18.285z"/>
        </svg>
      )
    },
    {
      name: "Tailwind",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: "Next.js",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#000000" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.628 0 12-5.373 12-12S18.628 0 12 0zm-.84 4.67h1.68v8.36h-1.68V4.67zm3.36 0h1.68v8.36h-1.68V4.67z"/>
          <path fill="#FFFFFF" d="M8.4 10.8h3.6v1.44H8.4V10.8z"/>
        </svg>
      )
    },
    {
      name: "MongoDB",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
        </svg>
      )
    },
    {
      name: "Framer",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#FF0055" d="M4 0h16v8H12L4 0zm8 8l8 8H4v-8h8zm0 8v8l-8-8h8z"/>
        </svg>
      )
    },
    {
      name: "Webflow",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <path fill="#4353FF" d="M24 4.309S22.661 8.317 18.715 17.098C14.049 16.746 10.27 9.569 8.597 4.309h-4.45l-.01 11.52 3.844-.002c.331-1.367.582-2.736.582-4.235 0-1.334-.165-2.669-.496-3.87h.827c1.845 5.425 5.894 11.395 10.915 11.854.58-.413 1.206-.826 1.827-1.24L24 4.31z"/>
        </svg>
      )
    }
  ];

  // Duplicate brands for seamless scrolling
  const duplicatedBrands = [...brands, ...brands, ...brands];

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-400/10 to-blue-600/10 rounded-full"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight relative z-10 ">
             Trusted in the Global Sector
            </h2>
          </motion.div>
           <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering innovative startups and established enterprises with cutting-edge web solutions
          </motion.p>
        </motion.div>

        {/* Logos Container */}
        <div className="relative mb-10">
          {/* Enhanced Gradient Overlays */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 z-20"></div>
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 z-20"></div>
          
          {/* Scrolling Logos */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center space-x-12 py-12"
              animate={{
                x: [-1200, -2400]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear"
                }
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <motion.div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center w-40 h-24 group cursor-pointer"
                  whileHover={{ scale: 1.15, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div
                    className="flex items-center justify-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg group-hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-all duration-500 relative overflow-hidden"
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div
                      className="transition-all duration-300 relative z-10"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                    >
                      {brand.logo}
                    </motion.div>
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {brand.name}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          <motion.div 
            variants={statsVariants}
            className="group text-center p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {counters.projects}+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-medium relative z-10">Projects Completed</p>
          </motion.div>

          <motion.div 
            variants={statsVariants}
            className="group text-center p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {counters.clients}+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-medium relative z-10">Happy Clients</p>
          </motion.div>

          <motion.div 
            variants={statsVariants}
            className="group text-center p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-green-300 dark:hover:border-green-500 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, rotate: 90 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {counters.success}%
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-medium relative z-10">Success Rate</p>
          </motion.div>

          <motion.div 
            variants={statsVariants}
            className="group text-center p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-300 dark:hover:border-orange-500 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, rotate: -90 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 relative z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              {counters.experience}+
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 font-medium relative z-10">Years Experience</p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Success Stories
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};
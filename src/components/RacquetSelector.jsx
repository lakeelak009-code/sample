import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'badminton',
    title: 'BADMINTON RACQUETS',
    theme: 'from-rose-500 to-pink-800',
    bgPattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 10px, transparent 10px, transparent 20px)',
    textColor: 'text-white',
    leftImage: 'https://images.unsplash.com/photo-1626224583764-847649623db6?q=80&w=2560&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1626224583764-847649623db6?q=80&w=2560&auto=format&fit=crop',
    centerContent: 'SMASH LIMITS'
  },
  {
    id: 'pickleball',
    title: 'PICKLEBALL RACQUETS',
    theme: 'from-emerald-400 to-green-600',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
    textColor: 'text-white',
    leftImage: 'https://images.unsplash.com/photo-1616263291069-88eb5e163519?q=80&w=2560&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1616263291069-88eb5e163519?q=80&w=2560&auto=format&fit=crop',
    centerContent: 'SERVE, DINK, SMASH'
  },
  {
    id: 'tennis',
    title: 'TENNIS RACQUETS',
    theme: 'from-cyan-400 to-blue-600',
    bgPattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
    textColor: 'text-white',
    leftImage: 'https://images.unsplash.com/photo-1613936360976-8f35dd0e5407?q=80&w=1975&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1530915536736-a617a94e2800?q=80&w=2070&auto=format&fit=crop',
    centerContent: 'ACE YOUR GAME'
  },
];

const RacquetSelector = () => {
  const [activeTab, setActiveTab] = useState('pickleball');
  const activeCategory = categories.find(c => c.id === activeTab);
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate(`/collections/${activeTab}`);
  };

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Category Selectors */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`text-sm sm:text-lg font-bold tracking-wider transition-colors duration-300 uppercase relative ${
                activeTab === cat.id ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat.title}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* Themed Content Area */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 w-full h-full bg-gradient-to-br ${activeCategory.theme}`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops)), ${activeCategory.bgPattern}`
              }}
            >
              <div className="relative w-full h-full flex items-center justify-between px-4 md:px-12 lg:px-24">
                
                {/* Left Image - Hidden on mobile, shown on md+ */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hidden md:block w-1/3 h-full relative"
                >
                  <img 
                    src={activeCategory.leftImage} 
                    alt={`${activeCategory.title} Left`}
                    className="object-contain w-full h-full transform -rotate-12 hover:rotate-0 transition-transform duration-700"
                  />
                </motion.div>

                {/* Center Text */}
                <div className="w-full md:w-1/3 text-center z-10">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg"
                  >
                    {activeCategory.centerContent}
                  </motion.h2>
                  <motion.button
                    onClick={handleShopClick}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-widest"
                  >
                    Shop {activeCategory.title}
                  </motion.button>
                </div>

                {/* Right Image - Hidden on mobile, shown on md+ */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hidden md:block w-1/3 h-full relative"
                >
                   <img 
                    src={activeCategory.rightImage} 
                    alt={`${activeCategory.title} Right`}
                    className="object-contain w-full h-full transform rotate-12 hover:rotate-0 transition-transform duration-700"
                  />
                </motion.div>

                {/* Mobile Background Image (Optional Overlay) */}
                <div className="absolute inset-0 md:hidden opacity-20 pointer-events-none">
                   <img 
                    src={activeCategory.rightImage} 
                    alt="Background"
                    className="object-cover w-full h-full"
                  />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RacquetSelector;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1622163642998-1ea14b60c57e?q=80&w=2560&auto=format&fit=crop',
    subtitle: 'Pure Aero Collection',
    title: 'OWN THE \nCOURT',
    description: 'Discover the new generation of rackets designed for spin and power.',
    cta: 'Shop Tennis',
    link: '/collections/tennis',
    color: 'text-yellow-400',
    btnColor: 'bg-yellow-400 hover:bg-yellow-500'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1626224583764-847649623db6?q=80&w=2560&auto=format&fit=crop',
    subtitle: 'Professional Badminton Gear',
    title: 'DOMINATE \nTHE GAME',
    description: 'Premium racquets and shoes for the ultimate smash.',
    cta: 'Shop Badminton',
    link: '/collections/badminton',
    color: 'text-blue-400',
    btnColor: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1616263291069-88eb5e163519?q=80&w=2560&auto=format&fit=crop',
    subtitle: 'Pickleball Essentials',
    title: 'PLAY YOUR \nWAY',
    description: 'Experience the fastest growing sport with top-tier equipment.',
    cta: 'Shop Pickleball',
    link: '/collections/pickleball',
    color: 'text-green-400',
    btnColor: 'bg-green-500 hover:bg-green-600'
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-gray-900 overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <motion.h2 
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`text-sm md:text-2xl font-bold mb-2 uppercase tracking-wider ${slides[current].color}`}
          >
            {slides[current].subtitle}
          </motion.h2>
          
          <motion.h1 
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight text-white whitespace-pre-line leading-tight"
          >
            {slides[current].title}
          </motion.h1>
          
          <motion.p 
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-base md:text-xl mb-6 md:mb-8 text-gray-200 leading-relaxed max-w-md md:max-w-none"
          >
            {slides[current].description}
          </motion.p>
          
          <motion.div
            key={`btn-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link 
              to={slides[current].link}
              className={`${slides[current].btnColor} text-black px-10 py-4 rounded-sm font-bold transition-all transform hover:scale-105 uppercase tracking-widest shadow-lg inline-block`}
            >
              {slides[current].cta}
            </Link>
          </motion.div>
        </div>
      </div>


      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

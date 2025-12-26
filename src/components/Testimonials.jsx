import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "I've ordered shoes, rackets and tons of other stuff over the years and continue to do so. I've never had a bad experience. They have great deals and sales, also the newest styles are always available. They also have a great demo deal to test multiple rackets to find your favourite.",
    author: "Vivek Bhat"
  },
  {
    id: 2,
    text: "Really great experience getting all sports products right on time and in good condition and good customer support too always feel good to buy from Sunrise Sport.",
    author: "Amit Kumar"
  },
  {
    id: 3,
    text: "Cherish-worthy customer service at Sunrise Sport, right from choosing racquets based on style of play to choice of strings to best prices to quick delivery.",
    author: "Priya Menon"
  },
  {
    id: 4,
    text: "One of the best sports store in Bangalore. I purchased my Badminton racket here. They guided me well to choose the right racket for my game style.",
    author: "Suresh Reddy"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-gray-900 font-normal tracking-wide uppercase">TESTIMONIALS</h2>
        </div>

        <div className="relative h-64 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full text-center px-4 md:px-12"
            >
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8 font-light">
                {testimonials[currentIndex].text}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-[1px] bg-gray-400"></span>
                <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {testimonials[currentIndex].author}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-4 h-4 border-2 border-black bg-black' 
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="sr-only">Current</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

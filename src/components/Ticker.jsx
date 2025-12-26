import React from 'react';
import { motion } from 'framer-motion';

const Ticker = () => {
  const text = "STRINGING SERVICES ON ALL RACQUET ORDERS. • ";
  // Repeat the text enough times to fill the width
  const repeatedText = text.repeat(10);

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-orange-600 border-y border-red-700 overflow-hidden py-2">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap font-bold text-white text-xs md:text-sm tracking-wide leading-tight"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          }}
        >
          <span>{repeatedText}</span>
          <span>{repeatedText}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Ticker;

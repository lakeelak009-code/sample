import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoCards = () => {
  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Card - Kit Bags */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl h-[250px] md:h-[300px] group cursor-pointer"
          >
            {/* Background with Blue Texture */}
            <div className="absolute inset-0 bg-blue-600 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-90 transition-transform duration-500 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-900 opacity-90"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-12">
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                  Tennis Kit Bag Collection
                </h3>
                <p className="text-blue-100 text-base md:text-lg mb-4 md:mb-6 font-medium">
                  Enter the court in style
                </p>
                <Link 
                  to="/collections/bags" 
                  className="inline-flex items-center bg-white text-blue-900 px-6 md:px-8 py-2 md:py-3 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm text-xs md:text-sm"
                >
                  Explore
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="absolute right-[-20px] bottom-[-20px] w-1/2 h-full md:h-4/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <img 
                src="https://placehold.co/400x400/png?text=Tennis+Bag" 
                alt="Tennis Kit Bag"
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </motion.div>

          {/* Right Card - Strings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl h-[300px] group cursor-pointer"
          >
            {/* Background with Blue Texture */}
            <div className="absolute inset-0 bg-blue-600 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-90 transition-transform duration-500 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500 to-blue-900 opacity-90"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12">
              <div className="w-2/3">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                  Tennis strings - upto 40% off
                </h3>
                <p className="text-blue-100 text-lg mb-6 font-medium">
                  Find the perfect match for your racquet
                </p>
                <Link 
                  to="/collections/strings" 
                  className="inline-flex items-center bg-white text-blue-900 px-8 py-3 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm text-sm"
                >
                  Explore
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="absolute right-[-20px] bottom-[-20px] w-1/2 h-full md:h-4/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <img 
                src="https://placehold.co/400x400/png?text=Tennis+Strings" 
                alt="Tennis Strings"
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PromoCards;

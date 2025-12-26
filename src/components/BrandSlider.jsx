import { motion } from 'framer-motion';

const BrandSlider = () => {
  const brands = [
    '/brand-images/Asics_Logo.svg',
    '/brand-images/Babolat_logo.svg',
    '/brand-images/Dunlop_brand_logo.svg',
    '/brand-images/Head-Logo-2.svg',
    '/brand-images/hndred.svg',
    '/brand-images/Li-Ning_logo_black.svg',
    '/brand-images/Logo-Yonex.svg',
    '/brand-images/Slazenger-Logo.wine.svg',
    '/brand-images/Tecnifibre_logo.svg',
    '/brand-images/idsKybD27b_logos.jpeg',
    '/brand-images/Monochrome_VICTOR_Logo.png',
    '/brand-images/vintrix.svg',
    '/brand-images/Wilson-logo.svg',
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-2">Our Brands</h3>
          <div className="w-12 h-1 bg-red-600 mx-auto"></div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex overflow-hidden group py-4">
          <motion.div
            className="flex gap-8 sm:gap-12 md:gap-24 items-center whitespace-nowrap w-max"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="w-20 sm:w-24 md:w-32 h-16 md:h-20 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
              >
                <img
                  src={brand}
                  alt="Brand"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;

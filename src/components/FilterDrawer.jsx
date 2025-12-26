import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

const FilterDrawer = ({ 
  isOpen, 
  onClose, 
  onApply, 
  currentFilters, 
  availableBrands, 
  availableCategories,
  priceRange 
}) => {
  // Local state for the form
  const [filters, setFilters] = useState(currentFilters);

  // Sync with props when drawer opens
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleBrandToggle = (brand) => {
    setFilters(prev => {
      const brands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value ? parseInt(value) : ''
      }
    }));
  };

  const handleClearAll = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: { min: '', max: '' },
      inStock: false
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawerVariants = {
    hidden: isMobile ? { y: '100%' } : { x: '100%' },
    visible: isMobile ? { y: 0 } : { x: 0 },
    exit: isMobile ? { y: '100%' } : { x: '100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed z-[70] bg-white shadow-2xl flex flex-col
              /* Mobile Styles */
              bottom-0 left-0 w-full h-[85vh] rounded-t-2xl
              md:rounded-none md:top-0 md:right-0 md:h-full md:w-[380px] md:bottom-auto md:left-auto
            `}
          >
             {/* We can use a different motion div for mobile vs desktop or accept that it slides from right on both.
                 However, user specifically asked for "bottom sheet" on mobile.
                 I'll add a window width check or just CSS animation classes?
                 Framer motion is JS based. I'll add a simple hook for isMobile.
             */}
             <DrawerContent 
               onClose={onClose}
               filters={filters}
               availableBrands={availableBrands}
               availableCategories={availableCategories}
               handleBrandToggle={handleBrandToggle}
               handleCategoryToggle={handleCategoryToggle}
               handlePriceChange={handlePriceChange}
               handleClearAll={handleClearAll}
               handleApply={handleApply}
             />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Separate component to handle the responsive animation logic cleaner if needed, 
// or just put content here.
const DrawerContent = ({ 
  onClose, filters, availableBrands, availableCategories, 
  handleBrandToggle, handleCategoryToggle, handlePriceChange, 
  handleClearAll, handleApply 
}) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        
        {/* Price Range */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={handlePriceChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={handlePriceChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {availableCategories.map(category => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  filters.categories.includes(category) 
                    ? 'bg-black border-black' 
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {filters.categories.includes(category) && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span className="text-gray-600 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4">Brands</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  filters.brands.includes(brand) 
                    ? 'bg-black border-black' 
                    : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {filters.brands.includes(brand) && <Check size={12} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <span className="text-gray-600">{brand}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Availability Mock */}
        <section>
          <h3 className="font-bold text-gray-900 mb-4">Availability</h3>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
              disabled
            />
            <span className="text-gray-400">Out of Stock (Hidden)</span>
          </label>
           <label className="flex items-center space-x-3 cursor-pointer mt-2">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
              checked={true}
              readOnly
            />
            <span className="text-gray-600">In Stock</span>
          </label>
        </section>

      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 bg-white">
        <div className="flex gap-4">
          <button
            onClick={handleClearAll}
            className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 px-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;

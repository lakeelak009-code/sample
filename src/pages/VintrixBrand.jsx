import { useState, useEffect, useRef } from 'react';
import { products } from '../data/products';
import { Filter, ChevronDown } from 'lucide-react';
import QuickView from '../components/QuickView';
import FilterDrawer from '../components/FilterDrawer';
import Footer from '../components/Footer';

const VintrixBrand = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: { min: '', max: '' },
    inStock: false
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableCategories = [...new Set(
    products.filter(p => p.brand.toLowerCase() === 'vintrix').map(p => p.category)
  )].sort();

  useEffect(() => {
    let result = products.filter(p => p.brand.toLowerCase() === 'vintrix');

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    if (filters.priceRange.min !== '') {
      result = result.filter(p => p.price >= Number(filters.priceRange.min));
    }
    if (filters.priceRange.max !== '') {
      result = result.filter(p => p.price <= Number(filters.priceRange.max));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [sortBy, filters]);

  const activeFilterCount = 
    filters.categories.length + 
    (filters.priceRange.min ? 1 : 0) + 
    (filters.priceRange.max ? 1 : 0);

  return (
    <>
      <div className="min-h-screen bg-white pt-8 pb-16">
        <div className="container mx-auto px-4">

          {/* Header with Vintrix Logo */}
          <div className="flex flex-col items-center mb-8 gap-6">
            <img 
              src="/brand-images/vintrix.svg" 
              alt="Vintrix" 
              className="h-16 md:h-20 w-auto object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight text-center">
              Vintrix Brand Products
            </h1>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            
            <div className="flex items-center gap-4">

              {/* Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button 
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-red-600 whitespace-nowrap"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <span className="hidden sm:inline">Sort by: </span>
                  <span className="sm:hidden">Sort: </span>

                  <span className="hidden md:inline">
                    {sortBy === 'price-low' ? 'Price: Low to High' : sortBy === 'price-high' ? 'Price: High to Low' : 'Featured'}
                  </span>

                  <span className="md:hidden">
                    {sortBy === 'price-low' ? 'Low-High' : sortBy === 'price-high' ? 'High-Low' : 'Featured'}
                  </span>

                  <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div 
                    className="
                      absolute top-full mt-2 bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100
                      
                      /* Desktop */
                      md:left-0 md:right-auto md:w-[200px]

                      /* Mobile Safe */
                      left-0 w-[160px] max-w-[160px] overflow-hidden
                    "
                  >
                    <button 
                      onClick={() => { setSortBy('featured'); setIsSortOpen(false); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors 
                      ${sortBy === 'featured' ? 'bg-gray-50 font-bold text-black' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      Featured
                    </button>

                    <button 
                      onClick={() => { setSortBy('price-low'); setIsSortOpen(false); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors 
                      ${sortBy === 'price-low' ? 'bg-gray-50 font-bold text-black' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      Price: Low to High
                    </button>

                    <button 
                      onClick={() => { setSortBy('price-high'); setIsSortOpen(false); }} 
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors 
                      ${sortBy === 'price-high' ? 'bg-gray-50 font-bold text-black' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                      Price: High to Low
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Button */}
              <button 
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                  activeFilterCount > 0 ? 'text-red-600 border-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={16} /> Filter
                {activeFilterCount > 0 && (
                  <span className="bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group relative bg-white">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />

                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1">
                        Save {product.discount}%
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white text-black px-6 py-2 flex items-center gap-2 font-medium hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10 hover:text-red-600 cursor-pointer">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-red-600 font-bold">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-gray-500 text-sm line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Vintrix products found</h3>
              <p className="text-gray-500">Try adjusting your filters.</p>
              <button 
                onClick={() => setFilters({ brands: [], categories: [], priceRange: { min: '', max: '' }, inStock: false })}
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <QuickView 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />

        <FilterDrawer 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={(newFilters) => setFilters(newFilters)}
          currentFilters={filters}
          availableBrands={['Vintrix']}
          availableCategories={availableCategories}
        />
      </div>
      <Footer />
    </>
  );
};

export default VintrixBrand;

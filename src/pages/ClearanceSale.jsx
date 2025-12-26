import { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown, Tag } from 'lucide-react';
import QuickView from '../components/QuickView';
import FilterDrawer from '../components/FilterDrawer';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ClearanceSale = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: { min: '', max: '' },
    inStock: false
  });

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerPage = 12;

  // SEO
  useEffect(() => {
    document.title = "Clearance Sale | Up to 60% OFF - Sunrise Sport";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Shop our Clearance Sale for the best deals on badminton and tennis gear. Up to 60% off on racquets, shoes, and accessories.');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch clearance products from backend
  useEffect(() => {
    const fetchClearanceProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all products from backend
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Filter for clearance/sale items only
        // Products with discount > 0 or marked as clearance
        const clearanceProducts = data.filter(p => 
          p.discount && p.discount > 0
        );
        
        setFilteredProducts(clearanceProducts);
      } catch (err) {
        console.error('Error fetching clearance products:', err);
        setError('Failed to load clearance products. Please try again later.');
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClearanceProducts();
  }, []);

  // Get available brands and categories from filtered products
  const availableBrands = [...new Set(filteredProducts.map(p => p.brand))].sort();
  const availableCategories = [...new Set(filteredProducts.map(p => p.category))].sort();

  // Apply filters and sorting
  useEffect(() => {
    let result = filteredProducts;

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
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
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
    setVisibleCount(itemsPerPage);
  }, [sortBy, filters]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  const activeFilterCount = 
    filters.brands.length + 
    filters.categories.length + 
    (filters.priceRange.min ? 1 : 0) + 
    (filters.priceRange.max ? 1 : 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-500">Loading clearance products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center text-xs text-gray-500">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="font-bold text-gray-900">Clearance Sale</span>
                </div>
            </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-red-600 text-white py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <span className="inline-block bg-white text-red-600 font-bold px-3 py-1 rounded-sm text-xs tracking-widest uppercase mb-4">
                    Limited Time Offer
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
                    Clearance Sale
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90 max-w-2xl mx-auto">
                    Up to 60% OFF on premium racquets, shoes, and gear. Grab them before they're gone!
                </p>
            </div>
        </div>

      <div className="container mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <p className="text-gray-500 font-medium">
            Showing {filteredProducts.length} deals
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
                  {sortBy === 'price-low' ? 'Price: Low to High' : sortBy === 'price-high' ? 'Price: High to Low' : sortBy === 'newest' ? 'Newest Arrivals' : 'Featured'}
                </span>

                <span className="md:hidden">
                  {sortBy === 'price-low' ? 'Low-High' : sortBy === 'price-high' ? 'High-Low' : sortBy === 'newest' ? 'Newest' : 'Featured'}
                </span>

                <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <div 
                  className="
                    absolute top-full mt-2 bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100
                    right-0 w-[200px]
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

                   <button 
                    onClick={() => { setSortBy('newest'); setIsSortOpen(false); }} 
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors 
                    ${sortBy === 'newest' ? 'bg-gray-50 font-bold text-black' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    Newest Arrivals
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.slice(0, visibleCount).map(product => (
                <div key={product.id} className="group relative bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={product.image_url || '/placeholder.jpg'} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
                              -{product.discount}%
                          </span>
                          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                              <Tag size={10} /> CLEARANCE
                          </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white text-black px-6 py-3 flex items-center gap-2 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg rounded text-xs"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</p>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 h-10 hover:text-red-600 cursor-pointer transition-colors">
                      <Link to={`/product/${product.id}`}>
                          {product.name}
                      </Link>
                    </h3>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-red-600 font-bold text-lg">₹ {product.price.toLocaleString()}</span>
                      {product.original_price > product.price && (
                        <span className="text-gray-400 text-sm line-through">₹ {product.original_price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm mb-4">
                  Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} deals
                </p>
                <button 
                  onClick={handleLoadMore}
                  className="bg-white border-2 border-black text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  Load More Deals
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No clearance items found</h3>
            <p className="text-gray-500 mb-6">There are currently no products on clearance sale.</p>
            <Link 
              to="/collections/badminton"
              className="px-8 py-3 bg-black text-white font-bold uppercase tracking-wider rounded hover:bg-gray-800 transition-colors inline-block"
            >
              Browse All Products
            </Link>
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
        availableBrands={availableBrands}
        availableCategories={availableCategories}
      />
      
      <Footer />
    </div>
  );
};

export default ClearanceSale;

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShoppingBag, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [results, setResults] = useState({ products: [], articles: [] });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const suggestions = [
    "Tennis Racquets", "Badminton Shoes", "Yonex", "Head", "Balls", "Grips", "Kit Bags"
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fetch products from backend API
  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], articles: [] });
      return;
    }

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const lowerQuery = query.toLowerCase();

        // Fetch products from Django API
        const productsResponse = await fetch('http://127.0.0.1:8000/api/products/');
        let filteredProducts = [];

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          
          // Filter products based on search query
          filteredProducts = productsData.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) || 
            p.brand.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
          ).slice(0, 10);
        }

        // For now, articles are empty since we don't have an articles API
        // You can add an articles API endpoint later
        setResults({ 
          products: filteredProducts, 
          articles: [] 
        });
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults({ products: [], articles: [] });
      } finally {
        setIsLoading(false);
      }
    };

    // Add debounce to avoid excessive API calls
    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Interface */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {/* Top Search Bar */}
            <motion.div 
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="w-full bg-white shadow-sm pointer-events-auto relative z-50"
            >
              <div className="container mx-auto px-4 h-20 flex items-center gap-4">
                <Search className="text-gray-400 flex-shrink-0" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands, and more..."
                  className="flex-1 h-full text-lg md:text-xl outline-none placeholder-gray-400 bg-transparent font-medium"
                />
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>

            {/* Side Panel Results */}
            <div className="flex-1 relative container mx-auto px-4">
              {(query || results.products.length > 0 || results.articles.length > 0) && (
                <motion.div 
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute top-4 right-0 bottom-4 w-full md:w-[500px] bg-white shadow-2xl rounded-l-lg overflow-hidden flex flex-col pointer-events-auto"
                >
                  {/* Suggestions Pills */}
                  <div className="p-4 border-b border-gray-100 overflow-x-auto whitespace-nowrap bg-gray-50/50">
                    <div className="flex gap-2">
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(s)}
                          className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors shadow-sm"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-gray-100">
                    <button 
                      onClick={() => setActiveTab('products')}
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors relative
                        ${activeTab === 'products' ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                      <ShoppingBag size={16} />
                      Products ({results.products.length})
                      {activeTab === 'products' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab('articles')}
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors relative
                        ${activeTab === 'articles' ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                    >
                      <FileText size={16} />
                      Articles ({results.articles.length})
                      {activeTab === 'articles' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                      )}
                    </button>
                  </div>

                  {/* Results Content */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50/30">
                    {isLoading ? (
                      <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <p className="text-gray-500 text-sm mt-3">Searching...</p>
                      </div>
                    ) : query && results.products.length === 0 && results.articles.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>No results found for "{query}"</p>
                        <p className="text-sm mt-2">Try searching for brands like "Head", "Yonex", or "Babolat"</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeTab === 'products' ? (
                          results.products.length > 0 ? (
                            results.products.map(product => (
                              <Link 
                                to={`/product/${product.id}`}
                                key={product.id} 
                                className="flex gap-4 p-3 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-100 group"
                                onClick={onClose}
                              >
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={product.image_url || '/placeholder.jpg'} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-sm text-gray-900 mb-1 truncate group-hover:text-red-600 transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-2 capitalize">{product.brand} • {product.category}</p>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-red-600 text-sm">Rs. {product.price.toLocaleString()}</span>
                                    {product.original_price && product.original_price > product.price && (
                                      <span className="text-xs text-gray-400 line-through">Rs. {product.original_price.toLocaleString()}</span>
                                    )}
                                  </div>
                                </div>
                                <div className="self-center">
                                  <ArrowRight size={16} className="text-gray-300 group-hover:text-red-600 transition-colors" />
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                              No products match your search
                            </div>
                          )
                        ) : (
                          results.articles.length > 0 ? (
                            results.articles.map(article => (
                              <div key={article.id} className="flex gap-4 p-3 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-100 cursor-pointer group">
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
                                      {article.category}
                                    </span>
                                    <span className="text-[10px] text-gray-400">{article.readTime}</span>
                                  </div>
                                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                                    {article.title}
                                  </h4>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                              No articles available yet
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  {(results.products.length > 0 || results.articles.length > 0) && (
                    <Link 
                      to={`/collections/all?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="p-4 bg-gray-900 text-white text-center text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
                    >
                      View All Results
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;

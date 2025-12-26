import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QuickView from './QuickView';
import api from '../services/api';

/* ---------- Product Card ---------- */
const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth < 768) {
      navigate(`/product/${product.id}`);
    } else {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1">
            Save {product.discount}%
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={handleQuickView}
            className="hidden md:flex bg-white text-black px-6 py-2 items-center gap-2 font-medium hover:bg-gray-100 transition"
          >
            <Eye size={18} />
            Quick View
          </button>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>
        <div className="flex justify-center gap-2">
          <span className="text-red-600 font-bold">
            Rs. {product.price}
          </span>
          {product.original_price > product.price && (
            <span className="text-gray-400 line-through text-sm">
              Rs. {product.original_price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Spotlight Section ---------- */
const Spotlight = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('BEST SELLERS');

  useEffect(() => {
    api
      .get('products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Spotlight fetch error', err));
  }, []);

  const getFilteredProducts = () => {
    if (activeTab === 'CLEARANCE SALE') {
      return products.filter(p => p.discount >= 20).slice(0, 4);
    }
    if (activeTab === 'NEW ARRIVALS') {
      return [...products].slice(-4).reverse();
    }
    return products.slice(0, 4);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {['BEST SELLERS', 'CLEARANCE SALE', 'NEW ARRIVALS'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bold uppercase tracking-wider ${
                activeTab === tab ? 'text-black' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h4 className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">
            #1 Racquet Store
          </h4>
          <h2 className="text-3xl font-bold text-gray-900">In the Spotlight</h2>
        </div>

        {/* Products */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/collections/all"
            className="border-2 border-black px-8 py-3 font-bold uppercase"
          >
            View All Products
          </Link>
        </div>
      </div>

      <QuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default Spotlight;

import { X, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const QuickView = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  useEffect(() => {
    if (product && isOpen) {
      setSelectedImage(product.image);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const mrp =
    product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    buyNow(product, quantity);
    onClose();
    navigate('/checkout');
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-lg shadow-2xl relative flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

            <div className="flex items-center gap-3 mb-4">
              {mrp && (
                <span className="line-through text-gray-500">
                  Rs. {mrp}
                </span>
              )}
              <span className="text-2xl font-bold text-black">
                Rs. {product.price}
              </span>
              {product.discount > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  SAVE {product.discount}%
                </span>
              )}
            </div>

            <div className="flex items-center border rounded w-32 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="w-full border py-3 font-bold"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white py-3 font-bold"
              >
                Buy Now
              </button>

              <button
                onClick={handleViewDetails}
                className="text-sm underline text-gray-600"
              >
                View full details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickView;

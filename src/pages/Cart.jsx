import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCheckoutItem } = useCart();

  useEffect(() => {
    // Requirement: Scroll resets to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-red-600 font-bold hover:underline uppercase tracking-wide"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          <Link to={`/product/${item.id}`} className="hover:text-red-600 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹ {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 capitalize mt-1">{item.brand}</p>
                    </div>

                    <div className="flex items-end justify-between mt-6">
                      <div className="flex items-center gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors text-sm font-medium"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                         <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                         <p className="font-bold text-lg text-gray-900">
                           ₹ {(item.price * item.quantity).toLocaleString()}
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹ {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                     <span>Shipping</span>
                     <span className="text-xs text-gray-500">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">₹ {cartTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Tax included.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    clearCheckoutItem();
                    sessionStorage.setItem('checkoutSource', 'cart');
                    navigate('/checkout');
                  }}
                  className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors rounded-md shadow-sm"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                   <Link to="/" className="text-sm text-gray-600 hover:text-black hover:underline">
                     or Continue Shopping
                   </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

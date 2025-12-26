import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCheckoutItem } = useCart();

  useEffect(() => {
    // Clear checkout item when order success page loads
    clearCheckoutItem();
  }, [clearCheckoutItem]);

  const orderDetails = JSON.parse(localStorage.getItem('lastOrder') || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-xl font-bold text-gray-900">
                  #{orderDetails.orderId || 'ORD' + Date.now()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <h3 className="font-bold text-gray-900">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{orderDetails.subtotal?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    ₹{orderDetails.shipping?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium text-gray-900">
                    ₹{orderDetails.taxes?.toLocaleString() || '0'}
                  </span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderDetails.discount?.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total Paid</span>
                  <span className="font-bold text-gray-900 text-lg">
                    ₹{orderDetails.total?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            {orderDetails.shippingAddress && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Delivery Address</h3>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}
                  </p>
                  <p>{orderDetails.shippingAddress.address}</p>
                  <p>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                  </p>
                  <p className="mt-1">Phone: {orderDetails.shippingAddress.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Package size={20} className="text-blue-600" />
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>You'll receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Track your order status in your profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Estimated delivery: 3-5 business days</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/order-history"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <Package size={20} />
              View Order History
            </Link>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Home size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;

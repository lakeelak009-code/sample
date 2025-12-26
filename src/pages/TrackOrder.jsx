import { useEffect, useState } from 'react';
import { Package, Search } from 'lucide-react';
import Footer from '../components/Footer';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Package className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-700 text-lg">
              Enter your order ID to track your shipment status
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order ID
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your order ID"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Track Order
            </button>
          </form>

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you're having trouble tracking your order, please contact our customer support team.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>📞 +91 8971752771 / 9632077201</p>
              <p>📧 support@sunrisesport.in</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;

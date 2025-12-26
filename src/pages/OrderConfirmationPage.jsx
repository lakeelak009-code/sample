import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`orders/${orderId}/`);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center max-w-md mx-auto">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const itemsTotal =
      order.items?.reduce(
        (sum, item) => sum + Number(item.product_price) * item.quantity,
        0
      ) || 0;

    const shippingCost = order.shipping || 0;
    return itemsTotal + shippingCost;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">

          {/* Order Number */}
          <div className="border-b pb-6 mb-6">
            <p className="text-gray-500 text-sm mb-1">Order Number</p>
            <p className="text-2xl font-bold text-gray-800">#{order.id}</p>
          </div>

          {/* Delivery Address */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 font-medium">
                {order.first_name} {order.last_name}
              </p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">
                {order.city}, {order.state} - {order.pincode}
              </p>
              <p className="text-gray-600 mt-2">📞 {order.phone}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.product_name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₹{(Number(item.product_price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-6 mb-6">
            <div className="flex justify-between mb-3">
              <p className="text-gray-600">Subtotal:</p>
              <p className="text-gray-800 font-medium">
                ₹{(
                  order.items?.reduce(
                    (sum, item) =>
                      sum + Number(item.product_price) * item.quantity,
                    0
                  ) || 0
                ).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Shipping:</p>
              <p className="text-gray-800 font-medium">
                ₹{(order.shipping || 0).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between border-t pt-4">
              <p className="text-lg font-bold text-gray-800">Total:</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Order Status</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <p className="font-semibold text-gray-800 capitalize">{order.status}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/order-history')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            View Order History
          </button>
          <button
            onClick={() => navigate('/collections/racquets')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Have questions? Contact us at <span className="text-blue-600">support@sunrisesport.com</span>
        </p>
      </div>
    </div>
  );
}

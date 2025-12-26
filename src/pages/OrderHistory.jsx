import { useEffect, useState } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Footer from "../components/Footer";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("orders/history/")
      .then((res) => {
        console.log("ORDER HISTORY RESPONSE:", res.data);
        setOrders(res.data.orders || []);   // <-- FIXED
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">

        <div className="flex items-center gap-4 mb-6">
          <Link to="/profile" className="text-gray-600 hover:text-black">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Order History
          </h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Package className="text-red-600" />
                      <div>
                        <h3 className="font-bold">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      {expandedOrders[order.id] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>

                  <p className="mt-3 font-semibold">
                    Total: ₹{order.total_amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {order.status}
                  </p>
                </div>

                {expandedOrders[order.id] && (
                  <div className="border-t bg-gray-50 p-6">
                    <h4 className="font-bold mb-3">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between bg-white p-3 rounded border"
                        >
                          <span>
                            {item.product_name} × {item.quantity}
                          </span>
                          <span>₹{item.subtotal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold">No Orders Yet</h3>
            <p className="text-gray-600 mb-4">
              You haven’t placed any orders
            </p>
            <Link
              to="/collections/all"
              className="px-6 py-3 bg-black text-white rounded-lg"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;

import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const TrackOrder = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, this would fetch orders from the API
      // For now, we'll show a placeholder
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12 animate-fadeIn">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto animate-slideUp">
            <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
            <p className="text-gray-600 mb-8">
              Please log in to track your orders
            </p>
            <Link
              to="/login"
              className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8 animate-slideLeft">Track Order</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to track your orders here!
            </p>
            <Link
              to="/products"
              className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Total: ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;


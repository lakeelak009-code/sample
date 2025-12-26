import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // SAFE DEFAULTS (IMPORTANT)
  const orders = [];
  const addresses = [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: Package,
      title: 'My Orders',
      description: 'Track, return, or buy things again',
      link: '/order-history',
      count: orders.length,
    },
    {
      icon: MapPin,
      title: 'Saved Addresses',
      description: 'Edit addresses for orders and gifts',
      link: '/saved-addresses',
      count: addresses.length,
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Edit login, name, and mobile number',
      link: '/account-settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hello, {user?.username || user?.email}
              </h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-red-600 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                  <item.icon size={24} className="text-gray-700 group-hover:text-red-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

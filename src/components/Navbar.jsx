import { Search, User, ShoppingCart, Menu, X, LogOut, Package, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

const Navbar = ({ isCheckout = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  // Simplified nav items - no dropdowns
  const navItems = [
    { title: 'BADMINTON', path: '/collections/badminton' },
    { title: 'TENNIS', path: '/collections/tennis' },
    { title: 'SHOES', path: '/collections/shoes' },
    { title: 'SQUASH', path: '/collections/squash' },
    { title: 'PICKLEBALL', path: '/collections/pickleball' },
    { title: 'PADEL', path: '/collections/padel' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-md font-sans">
      <div className="container mx-auto px-2 sm:px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Button - Hide on Checkout */}
        {!isCheckout && (
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Logo */}
        <div className={`flex-1 lg:flex-none flex ${isCheckout ? 'justify-start' : 'justify-center lg:justify-start'}`}>
          <Link to="/" className="flex items-center">
            <img 
              src="/brand-images/sunrise sport.png" 
              alt="Sunrise Sport" 
              className="h-11 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Hide on Checkout */}
        {!isCheckout && (
          <nav className="hidden lg:flex items-center justify-center gap-4 h-full">
            {navItems.map((item) => (
              <Link 
                key={item.title}
                to={item.path}
                className="text-xs font-bold text-gray-800 hover:text-red-600 transition-colors uppercase tracking-wide py-1 px-2"
              >
                {item.title}
              </Link>
            ))}
            
            <div className="h-full flex items-center">
              <Link to="/brands/vintrix" className="flex items-center px-2 hover:opacity-80 transition-opacity">
                <img 
                  src="/brand-images/vintrix.svg" 
                  alt="Vintrix" 
                  className="h-6 w-auto object-contain"
                />
              </Link>
            </div>
            
            <div className="h-full flex items-center">
              <Link to="/free-stringing" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide whitespace-nowrap px-2 py-0.5 rounded-md bg-red-50">
                STRINGING SERVICES
              </Link>
            </div>
            
            <div className="h-full flex items-center">
              <Link to="/clearance-sale" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide px-1">
                CLEARANCE SALE
              </Link>
            </div>
          </nav>
        )}

        {/* Actions - Right - Hide on Checkout */}
        {!isCheckout && (
          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Profile Icon & Menu */}
            <div className="relative" ref={profileRef}>
              <button 
                className="hover:text-red-600 transition-colors flex items-center py-2 md:py-4"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <User size={20} className="md:w-6 md:h-6" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      {/* Logged In Menu */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">Hello, {user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User size={16} />
                        My Profile
                      </Link>
                      <Link
                        to="/order-history"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Package size={16} />
                        My Orders
                      </Link>
                      <Link
                        to="/saved-addresses"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <MapPin size={16} />
                        Saved Addresses
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Not Logged In Menu */}
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button 
              className="hover:text-red-600 transition-colors flex items-center py-2 md:py-4"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Cart Button */}
            <button 
              className="hover:text-red-600 transition-colors relative py-2 md:py-4"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={20} className="md:w-6 md:h-6" />
              <span className="absolute top-0 right-[-5px] md:-top-2 md:-right-2 bg-black text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {!isCheckout && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}

      {/* Mobile Navigation Menu Overlay */}
      {isMenuOpen && !isCheckout && (
        <div className="fixed inset-0 z-[100] bg-black/50 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-xs bg-white shadow-xl flex flex-col h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0 bg-white">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/brand-images/sunrise sport.png" 
                  alt="Sunrise Sport" 
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto px-0 pb-24">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="block w-full p-5 font-bold text-gray-800 hover:text-red-600 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link to="/brands/vintrix" className="flex items-center p-5 border-b border-gray-50 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/brand-images/vintrix.svg" 
                  alt="Vintrix" 
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <Link to="/free-stringing" className="block p-5 font-bold text-red-600 border-b border-gray-50 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                STRINGING SERVICES
              </Link>
              <Link to="/clearance-sale" className="block p-5 font-bold text-red-600 border-b border-gray-50 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                CLEARANCE SALE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

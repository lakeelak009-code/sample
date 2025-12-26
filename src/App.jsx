// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import Ticker from './components/Ticker';
import PromoCards from './components/PromoCards';
import BrandSlider from './components/BrandSlider';
import RacquetSelector from './components/RacquetSelector';
import Spotlight from './components/Spotlight';
import Features from './components/Features';
import Testimonials from './components/Testimonials';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SavedAddresses from './pages/SavedAddresses';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistory from './pages/OrderHistory';
import AccountSettings from './pages/AccountSettings';
import CheckoutNew from './pages/CheckoutNew';
import OrderSuccess from './pages/OrderSuccess';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import ClearanceSale from './pages/ClearanceSale';
import FreeStringing from './pages/FreeStringing';
import VintrixBrand from './pages/VintrixBrand';
import StoreLocations from './pages/StoreLocations';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundReturnPolicy from './pages/RefundReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsOfService from './pages/TermsOfService';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <>
      <ScrollToTop />
      {!isCheckout && <WhatsAppButton />}
      {!isCheckout && <CartDrawer />}
      <div className="sticky top-0 z-50">
        {!isCheckout && <AnnouncementBar />}
        <Navbar isCheckout={isCheckout} />
      </div>

      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <main>
              <Hero />
              <Ticker />
              <PromoCards />
              <BrandSlider />
              <RacquetSelector />
              <Spotlight />
              <Features />
              <Testimonials />
            </main>
            <Footer />
          </div>
        } />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutNew />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/clearance-sale" element={<ClearanceSale />} />
        <Route path="/free-stringing" element={<FreeStringing />} />
        <Route path="/brands/vintrix" element={<VintrixBrand />} />
        <Route path="/store-locations" element={<StoreLocations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/collections/:category" element={
          <div className="min-h-screen bg-white">
            <Shop />
            <Footer />
          </div>
        } />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/saved-addresses" element={
          <ProtectedRoute>
            <SavedAddresses />
          </ProtectedRoute>
        } />
        <Route path="/order-history" element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />
        <Route path="/account-settings" element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
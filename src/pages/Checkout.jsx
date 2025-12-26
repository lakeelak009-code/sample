import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  MapPin, 
  CreditCard, 
  Lock, 
  HelpCircle
} from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, checkoutItem, clearCheckoutItem } = useCart();
  const navigate = useNavigate();
  
  // Determine which items to checkout
  const checkoutItems = checkoutItem ? [checkoutItem] : cart;
  const isDirectCheckout = !!checkoutItem;
  
  // Calculate totals based on checkout items
  const itemsTotal = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const [formData, setFormData] = useState({
    email: '',
    whatsappUpdates: false,
    country: 'India',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    saveInfo: false,
    paymentMethod: 'card',
    billingSameAsShipping: true,
    discountCode: ''
  });

  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Calculate totals
  const shipping = 0; // Free shipping for now
  const taxRate = 0.18; // 18% GST mock
  const taxes = Math.round(itemsTotal * taxRate);
  const total = itemsTotal + taxes + shipping - discountAmount;
  
  // Clear checkout item when component unmounts or navigates away
  useEffect(() => {
    return () => {
      if (isDirectCheckout) {
        clearCheckoutItem();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApplyDiscount = () => {
    // Mock discount validation
    if (formData.discountCode.toUpperCase() === 'WELCOME20') {
      setDiscountAmount(Math.round(itemsTotal * 0.2));
      setDiscountApplied(true);
      alert('Discount Applied: 20% Off');
    } else {
      alert('Invalid discount code');
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill in all required fields');
      return;
    }
    // Mock payment gateway trigger
    console.log('Processing payment...', formData);
    alert('Payment Successful! Order placed.');
    
    // Clear checkout item after successful payment
    if (isDirectCheckout) {
      clearCheckoutItem();
    }
    
    // Navigate to success page or home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:min-h-screen">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 py-6 lg:py-12">
            {/* Header/Breadcrumb (Optional but good for UX) */}
            <div className="mb-8">
              <div className="flex items-center text-sm mt-2 text-gray-500">
                <span>Cart</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-black">Checkout</span>
                <span className="mx-2">/</span>
                <span>Payment</span>
              </div>
            </div>

            <form onSubmit={handlePayNow} className="space-y-8">
              
              {/* 1. Contact Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
                  <div className="text-sm">
                    <span className="text-gray-500">Have an account? </span>
                    <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="whatsappUpdates"
                      checked={formData.whatsappUpdates}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Get order updates on WhatsApp</span>
                  </label>
                </div>
              </section>

              {/* 2. Delivery Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery</h2>
                <div className="space-y-4">
                  {/* Country */}
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Names */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name (optional)"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Apartment */}
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />

                  {/* City, State, Pincode */}
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                     <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        required
                      >
                        <option value="">State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="KA">Karnataka</option>
                        <option value="TN">Tamil Nadu</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="PIN code"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />

                  {/* Save Info Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Save this information for next time</span>
                  </label>
                </div>
              </section>

              {/* 3. Shipping Method */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping method</h2>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-500 text-sm text-center">
                    Enter your shipping address to view available shipping methods
                  </p>
                </div>
              </section>

              {/* 4. Payment Section */}
              <section>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    All transactions are secure and encrypted.
                    <Lock className="w-3 h-3 ml-1" />
                  </p>
                </div>

                {/* Payment Widget Box */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                    <span className="font-medium text-gray-900">Razorpay Secure</span>
                    <div className="flex space-x-2">
                       {/* Mock Icons */}
                       <div className="w-8 h-5 bg-gray-200 rounded"></div>
                       <div className="w-8 h-5 bg-gray-200 rounded"></div>
                       <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="p-8 text-center bg-white">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">
                      After clicking "Pay now", you will be redirected to Razorpay to complete your purchase securely.
                    </p>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Billing address</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <label className="flex items-center p-4 cursor-pointer border-b border-gray-200">
                      <input
                        type="radio"
                        name="billingSameAsShipping"
                        checked={formData.billingSameAsShipping === true}
                        onChange={() => setFormData(p => ({ ...p, billingSameAsShipping: true }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-900">Same as shipping address</span>
                    </label>
                    <label className="flex items-center p-4 cursor-pointer bg-gray-50">
                      <input
                        type="radio"
                        name="billingSameAsShipping"
                        checked={formData.billingSameAsShipping === false}
                        onChange={() => setFormData(p => ({ ...p, billingSameAsShipping: false }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-900">Use a different billing address</span>
                    </label>
                  </div>
                </div>

                {/* Pay Now Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
                >
                  Pay now
                </button>
              </section>
            </form>
          </div>

          {/* Right Column - Order Summary (Sticky) */}
          <div className="lg:col-span-5 bg-gray-50 lg:bg-gray-50 border-l border-gray-200 -mx-4 lg:mx-0 px-4 py-6 lg:py-12 lg:px-8 lg:min-h-screen">
             <div className="lg:sticky lg:top-6">
                {/* Product List */}
                <div className="space-y-4 mb-6">
                  {checkoutItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No items to checkout</p>
                  ) : (
                    checkoutItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 border border-gray-200 rounded-lg overflow-hidden bg-white">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                              {item.quantity}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.brand || 'One Size'}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Discount Code */}
                <div className="flex space-x-3 mb-6 pb-6 border-b border-gray-200">
                  <input
                    type="text"
                    name="discountCode"
                    placeholder="Discount code"
                    value={formData.discountCode}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                    disabled={!formData.discountCode}
                  >
                    Apply
                  </button>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{itemsTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Shipping</span>
                     <span className="text-xs text-gray-500">Enter shipping address</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      Estimated taxes
                      <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                    </span>
                    <span className="font-medium text-gray-900">₹{taxes.toLocaleString()}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                     <span className="text-xs text-gray-500 mr-2">INR</span>
                     <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-right">
                   Including ₹{taxes.toLocaleString()} in taxes
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;

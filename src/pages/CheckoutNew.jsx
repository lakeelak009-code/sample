import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; 
import { 
  ChevronDown, 
  ChevronUp,
  MapPin, 
  CreditCard, 
  Lock, 
  HelpCircle,
  Check,
  Truck,
  Zap,
  ShoppingCart
} from 'lucide-react';

const CheckoutNew = () => {
  const { cart, checkoutItem, clearCheckoutItem } = useCart();
  const { user, addresses = [], addOrder } = useAuth();
  const navigate = useNavigate();
  
  // Determine which items to checkout
  // If checkoutItem is malformed or stale, fall back to full cart.
  const isValidCheckoutItem =
    !!checkoutItem &&
    typeof checkoutItem === 'object' &&
    checkoutItem.id != null &&
    checkoutItem.name &&
    typeof checkoutItem.price === 'number' &&
    typeof checkoutItem.quantity === 'number' &&
    checkoutItem.quantity > 0;
  if (checkoutItem && !isValidCheckoutItem) {
    console.warn('Invalid checkoutItem detected; falling back to cart.', checkoutItem);
  }
  const checkoutItems = isValidCheckoutItem ? [checkoutItem] : cart;
  const isDirectCheckout = isValidCheckoutItem;
  
  // Load saved checkout data
  const savedCheckoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
  
  const [formData, setFormData] = useState({
    email: savedCheckoutData.email || user?.email || '',
    whatsappUpdates: savedCheckoutData.whatsappUpdates || false,
    country: 'India',
    firstName: savedCheckoutData.firstName || user?.name?.split(' ')[0] || '',
    lastName: savedCheckoutData.lastName || user?.name?.split(' ').slice(1).join(' ') || '',
    address: savedCheckoutData.address || '',
    apartment: savedCheckoutData.apartment || '',
    city: savedCheckoutData.city || '',
    state: savedCheckoutData.state || '',
    pincode: savedCheckoutData.pincode || '',
    phone: savedCheckoutData.phone || user?.phone || '',
    saveInfo: false,
    paymentMethod: 'razorpay',
    billingSameAsShipping: true,
    // Billing Address Fields
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingPhone: '',
    
    discountCode: '',
    shippingMethod: 'standard'
  });

  const [errors, setErrors] = useState({});
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  
  // Calculate totals
  const itemsTotal = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const shippingOptions = {
    standard: { name: 'Standard Delivery', price: 0, days: '5-7 business days' },
    express: { name: 'Express Delivery', price: 149, days: '2-3 business days' }
  };
  
  const shipping = formData.shippingMethod ? shippingOptions[formData.shippingMethod].price : 0;
  const taxRate = 0.18; // 18% GST
  const taxes = Math.round(itemsTotal * taxRate);
  const total = itemsTotal + taxes + shipping - discountAmount;

  // Auto-fill from saved address if available and not manually overridden
  useEffect(() => {
    if (addresses.length > 0 && !savedCheckoutData.address && !formData.address) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      if (defaultAddress) {
        fillAddress(defaultAddress);
      }
    }
  }, [addresses]);

  // If user came from /cart, ensure we checkout the full cart (not an older Buy Now item)
  useEffect(() => {
    const source = sessionStorage.getItem('checkoutSource');
    if (source === 'cart') {
      clearCheckoutItem();
      sessionStorage.removeItem('checkoutSource');
    }
  }, []);

  const fillAddress = (addr) => {
    setFormData(prev => ({
      ...prev,
      firstName: addr.name?.split(' ')[0] || '',
      lastName: addr.name?.split(' ').slice(1).join(' ') || '',
      address: addr.addressLine || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      phone: addr.phone || '',
      country: 'India' // Default
    }));
  };

  const handleSavedAddressChange = (e) => {
    const addressId = e.target.value;
    if (addressId) {
      const selectedAddr = addresses.find(a => a.id === addressId);
      if (selectedAddr) {
        fillAddress(selectedAddr);
      }
    }
  };

  // Show shipping options when address is filled
  useEffect(() => {
    if (formData.address && formData.city && formData.pincode) {
      setShowShippingOptions(true);
    } else {
      setShowShippingOptions(false);
    }
  }, [formData.address, formData.city, formData.pincode]);

  // Save form data to localStorage on change
  useEffect(() => {
    if (formData.saveInfo) {
      localStorage.setItem('checkoutData', JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    // Required fields
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    // Pincode validation
    const pincodeRegex = /^[0-9]{6}$/;
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Billing Address Validation if separate
    if (!formData.billingSameAsShipping) {
      if (!formData.billingFirstName) newErrors.billingFirstName = 'First name is required';
      if (!formData.billingLastName) newErrors.billingLastName = 'Last name is required';
      if (!formData.billingAddress) newErrors.billingAddress = 'Address is required';
      if (!formData.billingCity) newErrors.billingCity = 'City is required';
      if (!formData.billingState) newErrors.billingState = 'State is required';
      if (!formData.billingPincode) newErrors.billingPincode = 'Pincode is required';
      else if (!pincodeRegex.test(formData.billingPincode)) newErrors.billingPincode = 'Pincode must be 6 digits';
      if (!formData.billingPhone) newErrors.billingPhone = 'Phone is required';
      else if (!phoneRegex.test(formData.billingPhone)) newErrors.billingPhone = 'Phone must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState('');
  const handleApplyDiscount = async () => {
  if (!formData.discountCode) return;

  try {
    const response = await api.post("coupons/apply/", {
      code: formData.discountCode
    });

    const discountPercent = response.data.discount_percent;

    const discount = Math.round(itemsTotal * (discountPercent / 100));

    setDiscountAmount(discount);
    setDiscountApplied(true);
    setCouponMessage(`✅ Discount applied: ${discountPercent}% off`);
    setCouponError('');
  } catch (error) {
    console.error("Coupon error:", error.response?.data);

    setDiscountApplied(false);
    setDiscountAmount(0);
    setCouponMessage('');
    setCouponError(
      error.response?.data?.code?.[0] || "Invalid discount code")
  }
};

  const handlePayNow = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  if (checkoutItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  setIsProcessing(true);

  try {
    // 1️⃣ CREATE ORDER (BACKEND)
    const response = await api.post("orders/create/", {
      items: checkoutItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total_amount: total,
      shipping_cost: shipping,
      tax: taxes,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      billing_same_as_shipping: formData.billingSameAsShipping,
      discount_amount: discountAmount,
      shipping_method: formData.shippingMethod,
    });

    const data = response.data;
    console.log("Order created:", data);

    if (!data.razorpay_order_id) {
      setIsProcessing(false);
      alert("Failed to create order");
      return;
    }

    // 2️⃣ OPEN RAZORPAY
    const options = {
      key: data.razorpay_key,
      amount: data.amount,
      currency: "INR",
      name: "Sunrise Sports",
      description: "Sports Equipment Payment",
      order_id: data.razorpay_order_id,

      handler: async function (response) {
        try {
          console.log("Payment response:", response);
          
          // 3️⃣ VERIFY PAYMENT
          const verifyResponse = await api.post("orders/verify/", {
            order_id: data.order_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          console.log("Verification response:", verifyResponse.data);

          if (verifyResponse.data.success) {
            setIsProcessing(false);
            // Clear cart
            localStorage.removeItem('checkoutData');
            // Redirect to confirmation
            navigate(`/order-confirmation/${data.order_id}`);
          } else {
            setIsProcessing(false);
            alert("Payment verification failed");
          }
        } catch (err) {
          console.error("Verification error:", err);
          setIsProcessing(false);
          alert(err.response?.data?.message || "Payment verification failed");
        }
      },

      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },

      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("Order creation error:", err);
    setIsProcessing(false);
    alert(err.response?.data?.message || "Failed to create order");
  }
};


  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 lg:min-h-screen">
          
          {/* Right Column - Order Summary (Sticky on Desktop, Collapsible on Mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-5 bg-gray-50 lg:bg-gray-50 border-b lg:border-l border-gray-200 -mx-4 lg:mx-0 lg:min-h-screen">
             {/* Mobile Order Summary Toggle */}
             <div className="lg:hidden sticky top-0 z-40 bg-gray-50 border-b border-gray-200">
               <button 
                 onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                 className="w-full flex items-center justify-between p-4 bg-gray-50"
                 type="button"
               >
                 <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                   <ShoppingCart size={18} />
                   <span>{isOrderSummaryOpen ? 'Hide' : 'Show'} order summary</span>
                   {isOrderSummaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </div>
                 <div className="font-bold text-lg">₹{total.toLocaleString()}</div>
               </button>
             </div>

             {/* Order Summary Content */}
             <div className={`${isOrderSummaryOpen ? 'block' : 'hidden'} lg:block px-4 py-6 lg:py-12 lg:px-8`}>
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
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 w-32 md:w-48">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.brand || 'One Size'}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Discount Code */}
                  <div className="flex flex-nowrap w-full gap-2 mb-6 pb-6 border-b border-gray-200">
                    <input
                      type="text"
                      name="discountCode"
                      placeholder="Discount code"
                      value={formData.discountCode}
                      onChange={handleInputChange}
                      className="w-[70%] min-w-0 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleApplyDiscount}
                      disabled={!formData.discountCode}
                      className="w-[30%] min-w-0 px-2 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      Apply
                    </button>
                    {couponMessage && (
                    <p className="mt-2 text-sm text-green-600 font-medium">
                           {couponMessage}
                    </p>
                    )}
                    {/* ❌ ERROR MESSAGE */}
                    {couponError && (
                     <p className="mt-2 text-sm text-red-600 font-medium">
                     {couponError}
                    </p>
                    )}              
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">₹{itemsTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Shipping</span>
                       {showShippingOptions ? (
                         <span className="font-medium text-gray-900">₹{shipping.toLocaleString()}</span>
                       ) : (
                         <span className="text-xs text-gray-500">Enter shipping address</span>
                       )}
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

          {/* Left Column - Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-7 py-6 lg:py-12">
            <div className="mb-8">
              <div className="flex items-center text-xs sm:text-sm mt-2 text-gray-500 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
                <span>Cart</span>
                <ChevronDown size={14} className="mx-2 rotate-[-90deg] flex-shrink-0" />
                <span className="text-gray-900 font-medium">Information</span>
                <ChevronDown size={14} className="mx-2 rotate-[-90deg] flex-shrink-0" />
                <span>Shipping</span>
                <ChevronDown size={14} className="mx-2 rotate-[-90deg] flex-shrink-0" />
                <span>Payment</span>
              </div>
            </div>

            <form onSubmit={handlePayNow} className="flex flex-col gap-6 lg:gap-8 pb-24 lg:pb-0" id="checkout-form">
              {/* Contact Information */}
              <section className="order-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Contact</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="whatsappUpdates"
                      checked={formData.whatsappUpdates}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    Email me with news and offers
                  </label>
                </div>
              </section>

              {/* Delivery Information */}
              <section className="order-2">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Delivery</h2>
                
                {/* Saved Addresses Dropdown */}
                {user && addresses.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Saved Addresses
                    </label>
                    <select
                      onChange={handleSavedAddressChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a saved address</option>
                      {addresses.map(addr => (
                        <option key={addr.id} value={addr.id}>
                          {addr.name}, {addr.city} {addr.isDefault ? '(Default)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base bg-white"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                      required
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                        required
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                        required
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="PIN code"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        maxLength="6"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                        required
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      maxLength="10"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    Save this information for next time
                  </label>
                </div>
              </section>

              {/* Shipping Method */}
              {showShippingOptions && (
                <section className="order-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Shipping method</h2>
                  <div className="space-y-3">
                    {Object.entries(shippingOptions).map(([key, option]) => (
                      <label
                        key={key}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.shippingMethod === key
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={key}
                            checked={formData.shippingMethod === key}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              {key === 'express' ? <Zap size={16} className="text-yellow-500" /> : <Truck size={16} className="text-gray-500" />}
                              <span className="font-medium text-gray-900 text-sm sm:text-base">{option.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{option.days}</span>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900 text-sm sm:text-base">₹{option.price}</span>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* Payment Method */}
              <section className="order-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Payment</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Razorpay Secure</span>
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-gray-500" />
                      <span className="text-xs text-gray-500">Secure Payment</span>
                    </div>
                  </div>
                  <div className="p-6 text-center bg-white">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-600 text-sm mb-4">
                      After clicking "Pay now", you will be redirected to complete your purchase securely.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded">UPI</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">Cards</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">Wallets</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">Net Banking</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pay Now Button (Mobile Sticky) */}
              <div className="order-5 lg:order-6 sticky bottom-0 left-0 right-0 z-20 bg-white p-3 border-t border-gray-200 lg:static lg:border-none lg:p-0 lg:bg-transparent -mx-4 px-4 sm:mx-0 sm:px-0">
                 <button
                   type="submit"
                   disabled={isProcessing}
                   className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg lg:shadow-none"
                 >
                   {isProcessing ? 'Processing...' : 'Pay now'}
                 </button>
              </div>

              {/* Billing Address */}
              <section className="order-6 lg:order-5">
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

                  {/* Billing Address Form */}
                  {!formData.billingSameAsShipping && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3 sm:space-y-4">
                      <div>
                        <select
                          name="country"
                          value={formData.country}
                          disabled
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 outline-none text-sm sm:text-base"
                        >
                          <option value="India">India</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <input
                            type="text"
                            name="billingFirstName"
                            placeholder="First name"
                            value={formData.billingFirstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.billingFirstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                            required
                          />
                          {errors.billingFirstName && <p className="text-red-500 text-xs mt-1">{errors.billingFirstName}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="billingLastName"
                            placeholder="Last name"
                            value={formData.billingLastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.billingLastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                            required
                          />
                          {errors.billingLastName && <p className="text-red-500 text-xs mt-1">{errors.billingLastName}</p>}
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          name="billingAddress"
                          placeholder="Address"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                          required
                        />
                        {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                      </div>

                      <div>
                        <input
                          type="text"
                          name="billingApartment"
                          placeholder="Apartment, suite, etc. (optional)"
                          value={formData.billingApartment}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div>
                          <input
                            type="text"
                            name="billingCity"
                            placeholder="City"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.billingCity ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                            required
                          />
                          {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="billingState"
                            placeholder="State"
                            value={formData.billingState}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.billingState ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                            required
                          />
                          {errors.billingState && <p className="text-red-500 text-xs mt-1">{errors.billingState}</p>}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="billingPincode"
                            placeholder="PIN code"
                            value={formData.billingPincode}
                            onChange={handleInputChange}
                            maxLength="6"
                            className={`w-full px-4 py-3 rounded-lg border ${errors.billingPincode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                            required
                          />
                          {errors.billingPincode && <p className="text-red-500 text-xs mt-1">{errors.billingPincode}</p>}
                        </div>
                      </div>

                      <div>
                        <input
                          type="tel"
                          name="billingPhone"
                          placeholder="Phone"
                          value={formData.billingPhone}
                          onChange={handleInputChange}
                          maxLength="10"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.billingPhone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base`}
                          required
                        />
                        {errors.billingPhone && <p className="text-red-500 text-xs mt-1">{errors.billingPhone}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </section>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutNew;

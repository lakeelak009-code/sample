import { useEffect } from 'react';
import Footer from '../components/Footer';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">Last updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Locations</h2>
              <p className="leading-relaxed mb-4">
                We currently ship to addresses within India. We have physical stores in Visakhapatnam, 
                Vizianagaram, and Vijayawada for local pickup options.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
              <p className="leading-relaxed mb-4">
                Orders are typically processed within 1-2 business days (excluding weekends and holidays). 
                You will receive a confirmation email with tracking information once your order has shipped.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Time</h2>
              <p className="leading-relaxed mb-4">
                Estimated delivery times vary by location:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Local (Visakhapatnam, Vizianagaram, Vijayawada):</strong> 1-2 business days</li>
                <li><strong>Major Cities:</strong> 3-5 business days</li>
                <li><strong>Other Locations:</strong> 5-7 business days</li>
              </ul>
              <p className="leading-relaxed mb-4">
                Please note that delivery times are estimates and may vary during peak seasons or due to 
                unforeseen circumstances.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
              <p className="leading-relaxed mb-4">
                Shipping charges are calculated at checkout based on your location and order value. 
                We offer free shipping on orders above ₹2,000.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
              <p className="leading-relaxed mb-4">
                Once your order ships, you will receive a tracking number via email. You can track your 
                shipment using our Track Order page or directly on the courier's website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Issues</h2>
              <p className="leading-relaxed mb-4">
                If you experience any issues with your delivery, such as delays or damaged packages, 
                please contact us immediately:
              </p>
              <p className="leading-relaxed">
                Email: support@sunrisesport.in<br />
                Phone: +91 8971752771 / 9632077201
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;

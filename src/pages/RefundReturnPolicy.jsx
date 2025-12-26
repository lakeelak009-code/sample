import { useEffect } from 'react';
import Footer from '../components/Footer';

const RefundReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Refund & Return Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">Last updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
              <p className="leading-relaxed mb-4">
                We accept returns within 7 days of delivery for most products. Items must be unused, 
                in their original packaging, and in the same condition as received.
              </p>
              <p className="leading-relaxed mb-4">
                The following items are not eligible for return:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Customized or personalized products</li>
                <li>Products with broken seals or tampered packaging</li>
                <li>Used or worn items</li>
                <li>Clearance or sale items (unless defective)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Contact our customer service team within 7 days of delivery</li>
                <li>Provide your order number and reason for return</li>
                <li>Wait for return authorization and instructions</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Ship the item to the provided return address</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
              <p className="leading-relaxed mb-4">
                Once we receive and inspect your return, we will process your refund within 5-7 business days. 
                The refund will be issued to your original payment method.
              </p>
              <p className="leading-relaxed mb-4">
                Please note that shipping charges are non-refundable, and you are responsible for return 
                shipping costs unless the item is defective or we made an error.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
              <p className="leading-relaxed mb-4">
                We offer exchanges for defective or damaged items. If you receive a defective product, 
                contact us immediately for a replacement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed mb-4">
                For return or refund inquiries, please contact:
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

export default RefundReturnPolicy;

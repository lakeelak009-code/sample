import { useEffect } from 'react';
import Footer from '../components/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">Last updated: December 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed mb-4">
                By accessing and using the Sunrise Sport website and services, you accept and agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Services</h2>
              <p className="leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these terms. 
                You must not:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Use our services in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Transmit any harmful or malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Responsibilities</h2>
              <p className="leading-relaxed mb-4">
                If you create an account, you are responsible for maintaining the confidentiality of your 
                account credentials and for all activities that occur under your account. You must notify 
                us immediately of any unauthorized use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product Information</h2>
              <p className="leading-relaxed mb-4">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant 
                that product descriptions, pricing, or other content is accurate, complete, or error-free. 
                We reserve the right to correct errors and update information at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Orders and Payment</h2>
              <p className="leading-relaxed mb-4">
                By placing an order, you make an offer to purchase products. We reserve the right to accept 
                or decline your order for any reason. Payment must be received before order processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="leading-relaxed mb-4">
                All content on our website, including text, graphics, logos, and images, is the property of 
                Sunrise Sport and is protected by intellectual property laws. You may not use our content 
                without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="leading-relaxed mb-4">
                To the fullest extent permitted by law, Sunrise Sport shall not be liable for any indirect, 
                incidental, special, or consequential damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p className="leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting. Your continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
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

export default TermsOfService;

import { Facebook, Instagram, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white pt-10 md:pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 6 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-8 mb-20">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/brand-images/sunrise sport.png" 
                alt="Sunrise Sport" 
                className="h-14 w-auto object-contain"
              />
            </Link>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: About & Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">About & Support</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li><Link to="/about" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">About</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Sports & Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Sports & Products</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li><Link to="/collections/tennis" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Tennis</Link></li>
              <li><Link to="/collections/badminton" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Badminton</Link></li>
              <li><Link to="/collections/squash" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Squash</Link></li>
              <li><Link to="/collections/shoes" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Shoes</Link></li>
              <li><Link to="/collections/padel" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Padel</Link></li>
              <li><Link to="/collections/pickleball" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Pickleball</Link></li>
            </ul>
          </div>

          {/* Column 4: Our Stores */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Our Stores</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li><Link to="/store-locations" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Visakhapatnam</Link></li>
              <li><Link to="/store-locations" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Vizianagaram</Link></li>
              <li><Link to="/store-locations" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block">Vijayawada</Link></li>
            </ul>
          </div>

          {/* Column 5: Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Help</h3>
            <ul className="space-y-3 text-[15px] text-gray-300">
              <li><Link to="/track-order" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block min-h-[44px] md:min-h-0 flex items-center">Track my Order</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block min-h-[44px] md:min-h-0 flex items-center">Privacy Policy</Link></li>
              <li><Link to="/refund-return-policy" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block min-h-[44px] md:min-h-0 flex items-center">Refund & Return Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block min-h-[44px] md:min-h-0 flex items-center">Shipping Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-sky-400 hover:underline transition-all duration-200 inline-block min-h-[44px] md:min-h-0 flex items-center">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 6: Contact & Newsletter */}
          <div className="space-y-10">
            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Contact Us</h3>
              <div className="space-y-4 text-[15px] text-gray-400">
                <p className="hover:text-white transition-colors cursor-pointer">
                  +91 8971752771 / 9632077201
                </p>
                <p className="hover:text-white transition-colors cursor-pointer">
                  support@sunrisesport.in
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-white">Newsletter</h3>
              <div className="relative border-b border-gray-700 pb-1">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-transparent text-white py-2 focus:outline-none text-sm placeholder-gray-500"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col items-center gap-6">
          {/* Payment Icons - Centered */}
          <div className="flex flex-wrap justify-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 max-w-full">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain bg-white rounded px-1" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain bg-white rounded px-1" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6 object-contain bg-white rounded px-1" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/1200px-Rupay-Logo.png" alt="RuPay" className="h-6 object-contain bg-white rounded px-1" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-6 object-contain bg-white rounded px-1" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 object-contain bg-white rounded px-1" />
          </div>

          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 Sunrise Sport. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

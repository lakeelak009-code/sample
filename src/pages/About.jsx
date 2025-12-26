import { useEffect } from 'react';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About Sunrise Sport</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Welcome to Sunrise Sport, your premier destination for high-quality sports equipment and gear. 
              We are passionate about helping athletes of all levels achieve their best performance.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To provide athletes with the finest sports equipment, expert guidance, and exceptional service 
              that empowers them to excel in their chosen sports.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Founded with a passion for sports and a commitment to quality, Sunrise Sport has grown to become 
              a trusted name in sports retail. We specialize in racquet sports including tennis, badminton, 
              squash, padel, and pickleball.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6">
              <li>Wide selection of premium brands and equipment</li>
              <li>Expert staff with in-depth product knowledge</li>
              <li>Professional stringing services</li>
              <li>Multiple store locations for your convenience</li>
              <li>Competitive pricing and regular promotions</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

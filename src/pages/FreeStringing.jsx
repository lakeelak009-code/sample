import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  HelpCircle, 
  Scissors, 
  Zap, 
  Clock, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Send
} from 'lucide-react';
import Footer from '../components/Footer';

const FreeStringing = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  // SEO
  useEffect(() => {
    document.title = "Stringing Services | Sunrise Sport";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get complimentary professional stringing with every racquet purchase. Choose your string and tension. Expert service by Sunrise Sport.');
    }
  }, []);

  const faqs = [
    {
      question: "Is stringing really free with any racquet?",
      answer: "Yes! When you purchase any premium racquet from Sunrise Sport, we provide professional stringing service completely free of charge. You only pay for the string itself if you choose a premium upgrade, otherwise standard synthetic gut is included."
    },
    {
      question: "How long does the stringing process take?",
      answer: "We offer same-day stringing for orders placed before 2 PM. For orders placed later, your racquet will be ready by the next business day. Shipping times apply after stringing is complete."
    },
    {
      question: "Can I choose my own tension?",
      answer: "Absolutely. You can specify your preferred tension in lbs. If you're unsure, our experts can recommend the ideal tension based on your playing style and the racquet model."
    },
    {
      question: "What machines do you use?",
      answer: "We use top-of-the-line electronic stringing machines from Yonex and Victor to ensure precise tension maintenance and consistency across the string bed."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
       {/* Breadcrumbs */}
       <div className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center text-xs text-gray-500">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="font-bold text-gray-900">Stringing Services</span>
                </div>
            </div>
        </div>

      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
            <img 
                src="https://images.unsplash.com/photo-1622163642998-1ea14b60c57e?q=80&w=2560&auto=format&fit=crop" 
                alt="Tennis Racquet Strings" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Award size={14} /> Premium Service
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
                Professional Stringing <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">On The House</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                Get complimentary professional stringing with every racquet purchase. Precision, power, and performance tailored just for you.
            </p>
            <div className="mt-10">
                <a href="#stringing-form" className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full uppercase tracking-widest transition-all transform hover:scale-105 inline-block">
                    Request Service
                </a>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Service Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Scissors size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Craftsmanship</h3>
                <p className="text-gray-600">
                    Certified stringers using electronic machines ensure consistent tension tailored to your game.
                </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Wide Selection</h3>
                <p className="text-gray-600">
                    Choose from top brands like Yonex, Babolat, Wilson, and Head. Poly, Multi, or Gut - we have it all.
                </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Turnaround</h3>
                <p className="text-gray-600">
                    Same-day service available for early orders. We get you back on the court faster than anyone else.
                </p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Content & FAQs */}
            <div className="lg:w-1/2">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">How It Works</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Select Your Racquet</h4>
                                <p className="text-gray-600">Browse our collection and pick the perfect racquet for your play style.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Choose String & Tension</h4>
                                <p className="text-gray-600">Use the form or order notes to specify your preferred string and tension.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">We String It For Free</h4>
                                <p className="text-gray-600">Our experts professionally string your racquet before shipping it to you.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <HelpCircle className="text-red-600" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                <button 
                                    className="w-full flex justify-between items-center text-left font-bold text-gray-900 hover:text-red-600 transition-colors"
                                    onClick={() => toggleFaq(index)}
                                >
                                    {faq.question}
                                    {activeFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                {activeFaq === index && (
                                    <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-1/2" id="stringing-form">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 sticky top-24">
                    {/* Delivery Info Banner */}
                    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-4 flex items-start gap-3">
                        <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="text-sm font-bold text-blue-900 mb-1">Fast Turnaround</p>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                Stringing completed and delivered within <span className="font-bold">48 hours</span> (Vizag premises only)
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Stringing Request</h2>
                        <p className="text-gray-500">Submit your preferences after placing an order.</p>
                    </div>

                    {formStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">Request Received!</h3>
                            <p className="text-green-700 mb-6">
                                We've noted your stringing preferences. Our team will prepare your racquet shortly.
                            </p>
                            <button 
                                onClick={() => setFormStatus('idle')}
                                className="text-green-800 font-bold underline hover:text-green-900"
                            >
                                Submit another request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Order Number</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        placeholder="#ORD-12345"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Racquet Model</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Yonex Astrox 99"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">String Type</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none appearance-none bg-white">
                                            <option>Yonex BG 65 (Standard)</option>
                                            <option>Yonex BG 80 (Control)</option>
                                            <option>Yonex Nanogy 98 (Repulsion)</option>
                                            <option>Babolat RPM Blast (Spin)</option>
                                            <option>Wilson Sensation (Comfort)</option>
                                            <option>Other (Specify in notes)</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tension (lbs)</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="18"
                                        max="35"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                        placeholder="24"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Address <span className="text-red-600">*</span></label>
                                <textarea 
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                                    rows="3"
                                    placeholder="Enter your complete delivery address"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                                <textarea 
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                                    rows="3"
                                    placeholder="Any specific requests?"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-gray-900 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'submitting' ? (
                                    'Submitting...'
                                ) : (
                                    <>
                                        Submit Request <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FreeStringing;

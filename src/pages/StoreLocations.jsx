import { MapPin, Phone, Clock } from 'lucide-react';
import Footer from '../components/Footer';

const StoreLocations = () => {
  const stores = [
    {
      id: 1,
      name: 'Main Branch – Visakhapatnam',
      address: 'Lotus Plaza, NH16, Kranthi Nagar, Isukathota, Maddilapalem, Visakhapatnam, Andhra Pradesh – 530022',
      phone: '9701924186',
      hours: {
        weekdays: 'Monday – Saturday: 10:00 AM – 10:00 PM',
        sunday: 'Sunday: 11:00 AM – 8:00 PM'
      },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lotus+Plaza+NH16+Kranthi+Nagar+Isukathota+Maddilapalem+Visakhapatnam+530022'
    },
    {
      id: 2,
      name: 'Vizianagaram Branch',
      address: 'Near Sharma Sweets, Ice Factory Junction, Ring Road, Vizianagaram, Andhra Pradesh – 535002',
      phone: '9642817131',
      hours: {
        weekdays: 'Monday – Saturday: 10:00 AM – 10:00 PM',
        sunday: 'Sunday: 11:00 AM – 8:00 PM'
      },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Near+Sharma+Sweets+Ice+Factory+Junction+Ring+Road+Vizianagaram+535002'
    },
    {
      id: 3,
      name: 'Vijayawada Branch',
      address: 'High School Road, Patamata, Benz Circle, Vijayawada, Andhra Pradesh – 520010',
      phone: '094946 55096',
      hours: {
        weekdays: 'Monday – Saturday: 10:00 AM – 10:00 PM',
        sunday: 'Sunday: 11:00 AM – 8:00 PM'
      },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=High+School+Road+Patamata+Benz+Circle+Vijayawada+520010'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            Our Store Locations
          </h1>
          <p className="text-lg md:text-xl text-center text-orange-100 max-w-2xl mx-auto">
            Visit us at any of our branches across Andhra Pradesh for the best sports equipment and expert advice
          </p>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stores.map((store) => (
            <div 
              key={store.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  {store.name}
                </h2>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {store.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a 
                      href={`tel:${store.phone.replace(/\s/g, '')}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>{store.hours.weekdays}</p>
                      <p>{store.hours.sunday}</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Button */}
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300 mt-4"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our friendly staff is ready to assist you with all your sporting needs. 
            Call ahead to check product availability or visit us during our working hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:9701924186"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Main Branch
            </a>
            <a 
              href="mailto:support@sunrisesport.in"
              className="inline-flex items-center gap-2 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StoreLocations;

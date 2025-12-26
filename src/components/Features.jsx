import { CheckCircle, Users, Truck, Award } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Icon className="w-8 h-8 text-red-600" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Award,
      title: "Genuine Products",
      description: "As an authorized dealer we provide only genuine products directly from manufacturers."
    },
    {
      icon: CheckCircle,
      title: "Quality Checked",
      description: "Thorough quality check before dispatch within 24-48 hours of receiving an order."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our passion for sports drives us to serve you better with a young team of former sports professionals."
    },
    {
      icon: Truck,
      title: "Trusted by Pros",
      description: "Trusted by the Pros and over 1,00,000 satisfied customers across India."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">WHY SUNRISE SPORT?</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

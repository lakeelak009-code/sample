import { Zap } from 'lucide-react';

const AnnouncementBar = () => {
  const messages = [
    "India’s #1 Racquet Store",
    "Free Shipping on orders above ₹1000",
    "Expert Help. Fast Delivery.",
    "Exclusive Deals Live Now"
  ];

  // Duplicate messages to create seamless loop
  const displayMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="bg-[#1e293b] text-white text-xs md:text-sm py-2.5 overflow-hidden relative z-[60]">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {displayMessages.map((msg, idx) => (
          <div key={idx} className="flex items-center mx-8 font-medium tracking-wide">
            <span>{msg}</span>
            <Zap size={14} className="ml-8 text-yellow-400 fill-yellow-400" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;

import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ConsultButton = () => {
  return (
    <Link
      to="/consultation"
      className="fixed bottom-8 right-8 z-50 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Book a consultation"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-5 h-5 transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></span>
      </div>
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-medium px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
        Book Consultation
        <span className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-black border-b-4 border-b-transparent"></span>
      </span>
    </Link>
  );
};

export default ConsultButton;


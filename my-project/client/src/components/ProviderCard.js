import React from "react";
import { Search, MapPin, Star, Clock, MessageSquare } from "lucide-react";

const ProviderCard = ({ service }) => {
  return (
    <div
      key={service.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={service.logo}
        alt={service.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-2">{service.name}</p>
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="mr-1">{service.rating}</span>
          <span className="text-gray-500">({service.reviews} ביקורות)</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-semibold">{service.price}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            פרטים נוספים
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;

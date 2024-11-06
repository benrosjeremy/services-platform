import React from "react";
import { Search, MapPin } from "lucide-react";

const HeroSection = ({ searchTerm, setSearchTerm, location, setLocation }) => {
  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          מצא את איש המקצוע המושלם עבורך
        </h1>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="איזה שירות אתה מחפש?"
                className="w-full pl-10 pr-12 py-2 border rounded-lg text-right"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="איפה?"
                className="w-full md:w-48 pl-10 pr-12 py-2 border rounded-lg text-right"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              חיפוש
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

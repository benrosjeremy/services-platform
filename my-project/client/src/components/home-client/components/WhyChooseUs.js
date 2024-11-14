import React from "react";
import { Star, Clock, MessageSquare } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-right">למה לבחור בנו?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">בעלי מקצוע מדורגים</h3>
            <p className="text-gray-600">קרא ביקורות אמיתיות מלקוחות קודמים</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">חוסך זמן</h3>
            <p className="text-gray-600">קבל הצעות מחיר במהירות וביעילות</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">תקשורת ישירה</h3>
            <p className="text-gray-600">דבר ישירות עם בעלי המקצוע</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

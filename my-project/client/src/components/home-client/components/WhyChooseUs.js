import React from "react";
import { Star, Clock, MessageSquare, Phone, Mail } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div>
      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-right">למה לבחור בנו?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">בעלי מקצוע מדורגים</h3>
              <p className="text-gray-600">
                קרא ביקורות אמיתיות מלקוחות קודמים וקבל תמונה אמינה על איכות השירות.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">חוסך זמן</h3>
              <p className="text-gray-600">
                מערכת חכמה שמציעה התאמות אישיות לצרכים שלך במהירות ובקלות.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">תקשורת ישירה</h3>
              <p className="text-gray-600">
                תוכל לפנות ישירות לבעלי המקצוע ולוודא שהדרישות שלך נענות.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright Section */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} זכויות שמורות. המקצוען</p>
              <p>פותח על ידי יצחק בנרוס</p>
            </div>
            
            {/* Social Media and Contact Info */}
            <div className="flex flex-col md:flex-row items-center md:space-x-6">
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <Phone className="w-5 h-5" />
                <p>050-123-4567</p>
              </div>
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <Mail className="w-5 h-5" />
                <p>hmqzwn@gmail.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61570054261403" className="text-blue-400 hover:text-blue-500">
                   Facebook-
                </a>
                
                <a href="#" className="text-blue-400 hover:text-blue-500">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhyChooseUs;

import React, { useState, useEffect } from "react";
import MenuBar from "../components/Auth/Common/MenuBar";
import HeroSection from "../components/mainPage/HeroSection";
import CategoryList from "../components/mainPage/CategoryList";
import FeaturedServices from "../components/mainPage/FeaturedServices";
import WhyChooseUs from "../components/mainPage/WhyChooseUs";
import "../App.css";
import ProvidersList from "../components/ProvidersList";

const UserHome = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // קריאה ל-API ברגע שהרכיב נטען
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Categories"); // עדכן את ה-API בהתאם
        if (!response.ok) {
          throw new Error("בעיה בטעינת הנתונים");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>שגיאה: {error}</div>;
  }
  return (
    <div className="UserHome">
      {/* <MenuBar /> */}
      <div className="min-h-screen bg-gray-50">
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
        />
        <CategoryList
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        <ProvidersList categoryFilter={categoryFilter} />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default UserHome;
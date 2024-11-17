import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import CategoryList from "./components/CategoryList";
import ProvidersList from "./components/ProvidersList";
import WhyChooseUs from "./components/WhyChooseUs";
import NewServiceRequestForm from "./components/NewServiceRequestForm";
// import ".../App.css";
import axios from "axios";

const UserHome = ({ user }) => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch(
          "http://localhost:5000/api/user/get-categories"
        );
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        const citiesRes = await fetch(
          "http://localhost:5000/api/user/get-cities"
        );
        const citiesData = await citiesRes.json();
        setCities(citiesData);

        const providersRes = await fetch(
          "http://localhost:5000/api/user/get-providers"
        );
        const providersData = await providersRes.json();
        setProviders(providersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleServiceRequestSubmit = async (serviceRequestData) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/ServiceRequests", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(serviceRequestData),
  //     });
  //     console.log(response);
  //     const serviceRequest = await response.json();

  //     // שמירת הספקים בטבלת הקשר
  //     const relatedProviders = providers.filter(
  //       (provider) => provider.categoryId === serviceRequestData.selectedCategory
  //     );

  //     for (const provider of relatedProviders) {
  //       await fetch("http://localhost:5000/api/ServiceRequestProviders", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           ServiceRequestID: serviceRequest.id,
  //           ServiceProviderID: provider.id,
  //         }),
  //       });
  //     }

  //     alert("בקשת השירות נשלחה בהצלחה!");
  //   } catch (err) {
  //     console.error("Error submitting service request:", err);
  //   }
  // };

  const handleNewServiceRequest = async (data) => {
    try {
      data.userId = user.user_id;
      const response = await axios.post("/api/user/create-service", data);
      alert("Service request added successfully!");
      // אחרי יצירת הבקשה, אתה יכול להוסיף את הבקשה לרשימה אם תרצה
      setRequests((prevRequests) => [...prevRequests, response.data]);
    } catch (err) {
      console.error(err);
      alert("Error adding service request.");
    }
  };

  if (loading) {
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>שגיאה: {error}</div>;
  }

  return (
    <div className="UserHome">
      <div className="min-h-screen bg-gray-50">
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
        />
        <CategoryList
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        <ProvidersList categoryFilter={categoryFilter} />
        <NewServiceRequestForm
          onSubmit={handleNewServiceRequest}
          cities={cities}
          categories={categories}
        />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default UserHome;

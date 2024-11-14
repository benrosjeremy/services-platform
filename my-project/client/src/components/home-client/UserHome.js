import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import CategoryList from "./components/CategoryList";
import ProvidersList from "./components/ProvidersList";
import WhyChooseUs from "./components/WhyChooseUs";
import NewServiceRequestForm from "./components/NewServiceRequestForm";
// import ".../App.css";

const UserHome = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch(
          "http://localhost:5000/api/Categories"
        );
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        const citiesRes = await fetch("http://localhost:5000/api/Cities");
        const citiesData = await citiesRes.json();
        setCities(citiesData);

        const providersRes = await fetch("http://localhost:5000/api/Providers");
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

  const handleServiceRequestSubmit = async (serviceRequestData) => {
    try {
      console.log("Service request data:", serviceRequestData); // הדפסת הנתונים לפני שליחה

      const response = await fetch(
        "http://localhost:5000/api/ServiceRequests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceRequestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData); // הצגת שגיאת השרת
        throw new Error(errorData.error || "Unknown error");
      }

      const serviceRequest = await response.json();

      console.log("Service request created:", serviceRequest); // הצגת תוצאה מוצלחת

      alert("בקשת השירות נשלחה בהצלחה!");
    } catch (err) {
      console.error("Error submitting service request:", err);
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
          categories={categories}
          providers={providers}
          cities={cities}
          onSubmit={handleServiceRequestSubmit}
        />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default UserHome;

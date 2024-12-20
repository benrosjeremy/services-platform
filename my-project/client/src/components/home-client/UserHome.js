import React, { useState, useEffect } from "react";
import SearchSection from "./components/noUse/SearchSection";
import CategoryList from "./components/CategoryList";
import ProvidersList from "./components/ProvidersList";
import WhyChooseUs from "./components/WhyChooseUs";
import NewServiceRequestForm from "./components/NewServiceRequestForm";
// import ".../App.css";
import axios from "axios";
import { usePopup } from "../commons/PopupContext";

const UserHome = ({ user }) => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const { showPopupMessage } = usePopup();
  const [resetForm, setResetForm] = useState(false);

  const handleSelectedProvidersChange = (selected) => {
    console.log("Checkbox changed" + selected);
    setSelectedProviders(selected);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleNewServiceRequest = async (data) => {
    try {
      // data.userId = user.user_id;
      // data.providers = selectedProviders;
      // data.serviceCategoryId = 1;

      data.append("userId", user.user_id);
      data.append("serviceCategoryId", categoryFilter);
      selectedProviders.forEach((provider) => {
        data.append("providers[]", provider); // הוספת כל ספק תחת השם "providers[]"
      });
      const response = await axios.post("/api/user/create-service", data);
      //alert("Service request added successfully!");
      showPopupMessage("הבקשה נשמרה בהצלחה!");
      setRequests((prevRequests) => [...prevRequests, response.data]);
      setResetForm(true);
      setTimeout(() => setResetForm(false), 0); // החזרת הערך ל-false לאחר רגע קצר
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "השמירה של הבקשה ניכשלה"; // אם אין הודעת שגיאה, הצג את הודעת ברירת המחדל
      console.error(errorMessage); // הדפסת השגיאה בקונסול
      showPopupMessage(errorMessage); // הצגת השגיאה בהודעת פופאפ
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
        <div className="service-request-form">
          <CategoryList
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <div className="service-request-form-new">
            <NewServiceRequestForm
              onSubmit={handleNewServiceRequest}
              cities={cities}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              resetForm={resetForm}
            />
          </div>
        </div>
        <ProvidersList
          categoryFilter={categoryFilter}
          cityFilter={cityFilter}
          onSelectedProvidersChange={handleSelectedProvidersChange}
          resetForm={resetForm}
        />

        <WhyChooseUs />
      </div>
    </div>
  );
};

export default UserHome;

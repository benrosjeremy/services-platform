import React, { useState, useEffect } from "react";
import SearchSection from "./components/SearchSection";
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
  const [selectedProviders, setSelectedProviders] = useState([]);

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
      console.log("vvvvv" +selectedProviders);
      data.userId = user.user_id;
      data.providers = selectedProviders;
      data.serviceCategoryId = 1;
      const response = await axios.post("/api/user/create-service", data);
      alert("Service request added successfully!");
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
        <CategoryList
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <NewServiceRequestForm
          onSubmit={handleNewServiceRequest}
          cities={cities}
        />
        {/* <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
        /> */}

        <ProvidersList
          categoryFilter={categoryFilter}
          onSelectedProvidersChange={handleSelectedProvidersChange}
        />

        <WhyChooseUs />
      </div>
    </div>
  );
};

export default UserHome;

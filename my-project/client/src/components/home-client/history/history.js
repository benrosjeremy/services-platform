import React, { useState, useEffect } from "react";
import axios from "axios";
import PriceOffers from "../components/PriceOffers";
import ProviderPopup from "../components/ProviderPopup"; // ייבוא קומפוננטת ProviderPopup
import "./ClientRequestsHistory.css";

const ClientRequestsHistory = ({ clientId }) => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
    type: "all",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await axios.post("/api/client/history", {
          clientId: clientId.user_id,
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error loading client requests history:", error);
      }
    };

    if (clientId) loadRequests();
  }, [clientId]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handlePopupToggle = (provider) => {
    setSelectedProvider(provider);
    setIsPopupOpen(!isPopupOpen);
  };

  const filteredRequests = requests
    .filter((request) => {
      const { status, date, type } = filters;
      let matches = true;

      if (status !== "all" && request.status !== status) matches = false;
      if (date && !new Date(request.createdAt).toISOString().startsWith(date))
        matches = false;
      if (type !== "all" && request.categoryName !== type) matches = false;

      return matches;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
    <div className="page-container">
      <h1 className="page-header">היסטוריית בקשות</h1>

      {/* Filters Section */}
      <div className="filters-container">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="all">כל הסטטוסים</option>
          <option value="בהמתנה">בהמתנה</option>
          <option value="אושר">אושר</option>
          <option value="נדחה">נדחה</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        />

        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="all">כל סוגי הבקשות</option>
          {["גינון", "הובלות", "ניקיון", "אינסטלציה", "חשמל", "שיפוצים"].map(
            (type) => (
              <option key={type} value={type}>
                {type}
              </option>
            )
          )}
        </select>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <p>לא נמצאו בקשות התואמות את הסינון.</p>
      ) : (
        filteredRequests.map((request) => (
          <div key={request.id} className="request-card">
            <p>{request.categoryIcon}</p>
            <p>
              <strong>{request.title}</strong> 
            </p>
            <p>
              <strong>תיאור הבעיה:</strong> {request.details}
            </p>
            <p>
              <strong>תאריך:</strong>{" "}
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
            {request.status === "אושר" && (
              <p>
                <strong>מחיר:</strong> {request.price} ש"ח
              </p>
            )}
            <p>
              <strong>סוג בקשה:</strong> {request.categoryName}
            </p>
            <p>
              <strong>עיר:</strong> {request.cityName}
            </p>
            {request.serviceImages?.length > 0 && (
              <div className="images-container">
                {request.serviceImages.map((imagePath, index) => (
                  <img
                    key={index}
                    src={`/images/${imagePath.path}`}
                    className="thumbnail1"
                  />
                ))}
              </div>
            )}
            {/* Price Offers Component */}
            <PriceOffers
              providers={request.serviceProviders}
              onPopupToggle={handlePopupToggle}
            />
          </div>
        ))
      )}

      
    </div>
    {/* Render Provider Popup */}
    {isPopupOpen && selectedProvider && (
      <ProviderPopup
        provider={selectedProvider}
        onClose={handlePopupToggle}
      />
    )}
    </>
  );
};

export default ClientRequestsHistory;

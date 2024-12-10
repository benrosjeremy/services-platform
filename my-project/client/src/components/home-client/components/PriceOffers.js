import React, { useState } from "react";
import "./PriceOffers.css"; // לקובץ CSS מותאם לאנימציה
import ProviderPopup from "./ProviderPopup";
const PriceOffers = ({ providers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const toggleOffers = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup = (provider) => {
    setSelectedProvider(provider);
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="price-offers-container">
      <button onClick={toggleOffers} className="toggle-offers-button">
        {isOpen ? "סגור הצעות מחיר" : "פתח הצעות מחיר"}
      </button>
      <div className={`offers-list ${isOpen ? "open" : "closed"}`}>
        {providers && providers.length > 0 ? (
          <div>
            {providers.map((provider, index) => (
              <div key={index} className="provider-card" class="bg-gray-100">
                <p>
                  <strong>ספק:</strong> {provider.serviceProviderId}
                </p>
                <p>
                  <strong>מחיר:</strong> {provider.price} ש"ח
                </p>
                <p>
                  <strong>סטטוס:</strong> {provider.status}
                </p>
                <div className="button-container">
                  <button
                    onClick={() => togglePopup(provider)}
                    className="text-white px-4 py-2 rounded transition-colors details-button"
                  >
                    פרטים ספק
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>אין ספקים מקושרים לבקשה זו.</p>
        )}
      </div>
      {isPopupOpen && (
        <ProviderPopup provider={selectedProvider} onClose={togglePopup} />
      )}
    </div>
  );
};

export default PriceOffers;

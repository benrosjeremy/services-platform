import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // אייקון חץ
import "./PriceOffers.css";
import ProviderPopup from "./ProviderPopup";

const PriceOffers = ({ providers, onPopupToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  // פונקציה לחישוב מספר הספקים עם הצעת מחיר לא ריקה או שונה מ-0
  const countValidOffers = () => {
    return providers.filter(
      (provider) => provider.price && provider.price !== 0
    ).length;
  };

  // סינון ומיון הספקים כך שהספקים עם הצעת מחיר לא ריקה או שונה מ-0 יהיו קודם
  const sortedProviders = providers
    ? providers
        .filter((provider) => provider.price && provider.price !== 0) // מסנן ספקים עם מחיר לא ריק ולא 0
        .concat(
          providers.filter(
            (provider) => !provider.price || provider.price === 0
          ) // מוסיף ספקים עם מחיר ריק או 0
        )
    : [];

  const toggleOffers = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="price-offers-container">
      <button
        onClick={toggleOffers}
        className={`toggle-offers-button ${isOpen ? "open" : ""}`}
      >
        {isOpen
          ? `קיבלת ${countValidOffers()} הצעות מחיר מתוך ${
              providers.length
            } - הסתר הצעות מחיר`
          : `קיבלת ${countValidOffers()} הצעות מחיר מתוך ${
              providers.length
            } - הצג הצעות מחיר`}
        <FaChevronDown className="arrow-icon" />
      </button>

      <div className={`offers-list ${isOpen ? "open" : "closed"}`}>
        {sortedProviders && sortedProviders.length > 0 ? (
          <div>
            {sortedProviders.map((provider, index) => (
              <div key={index} className="provider-card bg-gray-100">
                <p>
                  <strong>ספק:</strong> {provider.name}
                </p>
                {provider.price && (
                  <p>
                    <strong>מחיר:</strong> {provider.price} ש"ח
                  </p>
                )}
                <p>
                  <strong>טלפון:</strong> {provider.phone}
                </p>
                <p>
                  <strong>סטטוס:</strong> {provider.status}
                </p>
                <div className="button-container">
                  <button
                    onClick={() => onPopupToggle(provider)} // קריאה לפונקציה שהגיעה כ- prop
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
    </div>
  );
};

export default PriceOffers;

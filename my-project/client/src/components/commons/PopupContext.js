import React, { createContext, useState, useContext } from "react";

// יצירת Context גלובלי
const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // פונקציה להצגת הודעה
  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // סגירה אוטומטית לאחר 3 שניות
  };

  return (
    <PopupContext.Provider
      value={{ showPopup, popupMessage, showPopupMessage }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// Hook לשימוש ב-Context
export const usePopup = () => useContext(PopupContext);

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProviderHome.css";

const ProviderHome = ({ provider }) => {
  const [requests, setRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all"); // מצב הסינון לפי סטטוס
  const [priceInput, setPriceInput] = useState(""); // state לניהול ערך הקלט עבור הצעת המחיר
  const [currentRequestId, setCurrentRequestId] = useState(null); // track the current request for price input

  const handleImageClick = (imagePath, request) => {
    setSelectedImage(imagePath);
    setSelectedRequest(request);
    setCurrentImageIndex(request.images.indexOf(imagePath)); // מעדכן את אינדקס התמונה שנבחרה
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0); // מאפס את אינדקס התמונה הנבחרת
  };

  const handleNextImage = (request) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === request.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (request) => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? request.images.length - 1 : prevIndex - 1
    );
  };

  const loadRequests = async () => {
    try {
      const response = await axios.post("/api/provider/get-service-requests", {
        providerId: provider.id,
      });
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  useEffect(() => {
    if (provider) loadRequests();
  }, [provider]);

  // סינון הבקשות לפי הסטטוס שנבחר
  const filteredRequests = requests.filter((request) => {
    if (filterStatus === "all") return true;
    return request.status === filterStatus;
  });

  const handleApprove = (requestId) => {
    setCurrentRequestId(requestId); // עדכון ה-ID של הבקשה הנוכחית
  };

  const handleSubmitPrice = async () => {
    const price = parseFloat(priceInput);
    if (!price || isNaN(price) || price <= 0) {
      alert("אנא הכנס סכום תקין להצעת המחיר.");
      return;
    }
    try {
      await axios.post("/api/provider/set-price", {
        providerId: provider.id,
        price,
        status: "אושר",
        requestId: currentRequestId,
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === currentRequestId
            ? { ...req, status: "אושר", providerPrice: price }
            : req
        )
      );
      setPriceInput(""); // מאפס את שדה הקלט
      setCurrentRequestId(null); // מאפס את ה-ID של הבקשה הנוכחית
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const renderDots = (images) => {
    return images.map((_, index) => (
      <span
        key={index}
        className={`dot ${index === currentImageIndex ? "active" : ""}`}
        onClick={() => setCurrentImageIndex(index)}
      ></span>
    ));
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post("/api/provider/set-price", {
        providerId: provider.id,
        status: "נדחה",
        price: null,
        requestId,
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: "נדחה", price: null } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">בקשות שהתקבלו</h1>

      {/* Dropdown לסינון סטטוס */}
      <div className="filter-status">
        <label>סינון לפי סטטוס:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">הכל</option>
          <option value="בהמתנה">בהמתנה</option>
          <option value="אושר">אושר</option>
          <option value="נדחה">נדחה</option>
        </select>
      </div>

      {filteredRequests.map((request) => (
        <div key={request.id} className="request-card">
          <p>
            <strong>תיאור הבעיה:</strong> {request.details}
          </p>
          <p>
            <strong>עיר:</strong> {request.city}
          </p>
          <p>
            <strong>תאריך:</strong>{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>סטטוס:</strong> {request.status}
          </p>

          {request.status === "אושר" && (
            <p>
              <strong>הצעת המחיר: </strong>
              {request.providerPrice} ש"ח
            </p>
          )}

          {request.images?.length > 0 && (
            <div className="images-container">
              {request.images.map((imagePath, index) => (
                <img
                  key={index}
                  src={`/images/${imagePath}`}
                  alt={`Request ID: ${request.id},  ${index + 1}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(imagePath, request)}
                />
              ))}
            </div>
          )}

          {request.status === "בהמתנה" && (
            <div>
              <p className="price-container">
                <strong>הצעת המחיר: </strong>
                <input
                  type="number"
                  placeholder="הכנס הצעת מחיר"
                  value={priceInput}
                  className="form-input price-input"
                  onChange={(e) => {
                    setPriceInput(e.target.value);
                    handleApprove(request.id);
                  }}
                />
              </p>

              <div className="button-container">
                {/* <button
                className="button approve-button"
                onClick={() => handleApprove(request.id)}
              >
                מלא הצעת מחיר
              </button> */}
                <button
                  className="button approve-button"
                  onClick={handleSubmitPrice}
                >
                  שלח הצעה
                </button>

                <button
                  className="button reject-button"
                  onClick={() => handleReject(request.id)}
                >
                  דחה בקשה
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* מודאל הצגת תמונה נבחרת עם קרוסל */}
      {selectedImage && selectedRequest && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close" onClick={closeModal}>
              &times;
            </div>
            <img
              src={`/images/${selectedRequest.images[currentImageIndex]}`}
              alt={`תמונה נבחרה מתוך בקשת שירות ${selectedRequest.id}`}
              className="modal-image"
            />
            <div className="carousel-controls">
              <button
                onClick={() => handlePrevImage(selectedRequest)}
                className="prev-button"
              >
                &#10094;
              </button>
              <div className="dots-container">
                {renderDots(selectedRequest.images)}
              </div>
              <button
                onClick={() => handleNextImage(selectedRequest)}
                className="next-button"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderHome;

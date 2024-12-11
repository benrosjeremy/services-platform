import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import AddReviewForm from "./AddReviewForm"; // ייבוא הקומפוננטה החדשה
import ProviderPopup from "./ProviderPopup"; // ייבוא הקומפוננטה החדשה

const ProviderCard = ({ service, isSelected, onSelectionChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // אחסון ביקורות
  const [averageRating, setAverageRating] = useState(0); // ממוצע דירוגים
  const [totalReviews, setTotalReviews] = useState(0); // מספר הביקורות
  const [isAddingReview, setIsAddingReview] = useState(false);

  const handleCheckboxChange = () => {
    console.log("Checkbox changed" + service.id);
    onSelectionChange(service.id, !isSelected);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const fetchReviews = () => {
    fetch(`/api/user/get-reviews?providerId=${service.id}`)
      .then((response) => response.json())
      .then((data) => {
        const reviewsData = data.reviews || [];
        setReviews(reviewsData);

        const totalRatings = reviewsData.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const average =
          reviewsData.length > 0 ? totalRatings / reviewsData.length : 0;

        setAverageRating(average.toFixed(1));
        setTotalReviews(reviewsData.length);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };
  // שליפת ביקורות מהשרת
  useEffect(() => {
    //if (isPopupOpen) {
    fetchReviews();
    //}
  }, [isPopupOpen]);

  const handleAddReview = (newReview) => {
    fetch(`/api/user/add-review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newReview, providerId: service.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReviews([...reviews, { ...newReview }]); // הוספת הביקורת לרשימה
          setIsAddingReview(false);
          fetchReviews(); // עדכון ממוצע דירוג ומספר ביקורות
        }
      })
      .catch((error) => console.error("Error adding review:", error));
  };
  return (
    <>
      <div
        key={service.id}
        className={`bg-white rounded-lg shadow-md overflow-hidden ${
          isSelected ? "border-2 border-blue-500" : ""
        }`}
      >
        <img
          src={`/images/${service.logo}`}
          alt={service.title}
          className="w-full h-48 object-cover logo-image"
        />

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-2">{service.name}</p>
          <p className="text-gray-600 mb-4">{service.city_name}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="mr-1">{averageRating}</span> {/* ממוצע הדירוג */}
            <span className="text-gray-500">({totalReviews} ביקורות)</span>{" "}
            {/* מספר הביקורות */}
          </div>
          <div className="flex justify-between items-center mt-4">
            
            
          <input
  type="checkbox"
  id={`customCheckbox-${service.id}`} 
  checked={isSelected}
  onChange={handleCheckboxChange}
  className="custom-checkbox"
/>
<label htmlFor={`customCheckbox-${service.id}`} className="checkbox-label">
  קבל ממני הצעת מחיר
</label>
<button
              onClick={togglePopup}
              className="text-white px-4 py-2 rounded transition-colors details-button"
            >
              פרטים נוספים
            </button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <ProviderPopup
          provider={service}
          onClose={togglePopup}
        />
      )}
    </>
  );
};

export default ProviderCard;

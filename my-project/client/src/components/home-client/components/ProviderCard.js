import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import AddReviewForm from "./AddReviewForm"; // ייבוא הקומפוננטה החדשה

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
            <button
              onClick={togglePopup}
              className="text-white px-4 py-2 rounded transition-colors details-button"
            >
              פרטים נוספים
            </button>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-container bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative h-[530px]">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
            <img
              src={`/images/${service.logo}`}
              alt={service.title}
              className="w-full h-48 object-cover logo-image mb-4"
            />
            <p className="text-gray-600 mb-4">{service.name}</p>
            <p className="text-gray-600 mb-4">{service.city}</p>

            {/* רשימת ביקורות */}
            <h4 className="text-lg font-semibold mb-2">ביקורות:</h4>
            <div className="reviews-container">
              {reviews.length === 0 ? (
                <p className="text-gray-500">אין ביקורות זמינות.</p>
              ) : (
                <ul className="space-y-2">
                  {reviews.map((review, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-4 rounded shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        {/* תצוגת דירוג כוכבים */}
                        <div className="flex items-center">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 ${
                                idx < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-gray-600 text-sm">
                            {review.reviewer_name}
                          </span>
                        </div>
                        {/* תאריך יצירת הביקורת */}
                        <span className="text-gray-500 text-xs">
                          {new Date(review.created_at).toLocaleDateString(
                            "he-IL"
                          )}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.review_text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {isAddingReview ? (
              <AddReviewForm
                onSubmit={handleAddReview}
                onCancel={() => setIsAddingReview(false)}
              />
            ) : (
              <button
                onClick={() => setIsAddingReview(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
              >
                הוסף ביקורת חדשה
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderCard;

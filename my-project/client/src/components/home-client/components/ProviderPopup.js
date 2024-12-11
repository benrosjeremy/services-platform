import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import AddReviewForm from "./AddReviewForm";

const ProviderPopup = ({ provider, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const fetchReviews = () => {
    console.log(provider);
    fetch(`/api/user/get-reviews?providerId=${provider.id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews || []);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = (newReview) => {
    fetch(`/api/user/add-review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newReview, providerId: provider.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReviews((prevReviews) => [...prevReviews, newReview]);
          fetchReviews();
          setIsAddingReview(false);
        }
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-container bg-white rounded-lg shadow-lg max-w-md w-full relative h-[530px]">
        <div className="title-sticky">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          <h3 className="text-xl font-semibold">{provider.title}</h3>
        </div>
        <img
          src={`/images/${provider.logo}`}
          alt={provider.title}
          className="w-full h-48 object-cover logo-image mb-4"
        />
        <p className="text-gray-600 mb-4">{provider.name}</p>
        <p className="text-gray-600 mb-4">{provider.city}</p>
        <p className="text-gray-600 mb-4">{provider.email}</p>
        <p className="text-gray-600 mb-4">{provider.phone}</p>
        <p className="text-gray-600 mb-4">{provider.service_description}</p>

        {/* רשימת ביקורות */}
        <h4 className="text-lg font-semibold mb-2">ביקורות:</h4>
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p className="text-gray-500">אין ביקורות זמינות.</p>
          ) : (
            <ul className="space-y-2">
              {reviews.map((review, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                  <div className="flex justify-between items-center mb-2">
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
                    <span className="text-gray-500 text-xs">
                      {new Date(review.created_at).toLocaleDateString("he-IL")}
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
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4 button-review"
          >
            הוסף ביקורת חדשה
          </button>
        )}
      </div>
    </div>
  );
};

export default ProviderPopup;

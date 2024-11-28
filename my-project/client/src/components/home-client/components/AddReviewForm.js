import React, { useState } from "react";
import { Star } from "lucide-react";

const AddReviewForm = ({ onSubmit, onCancel }) => {
  const [reviewText, setReviewText] = useState(""); // טקסט הביקורת
  const [rating, setRating] = useState(0); // דירוג הביקורת
  const [reviewerName, setReviewerName] = useState(""); // שם המשתמש

  const handleSubmit = (e) => {
    e.preventDefault();

    // שולח את המידע להורה
    onSubmit({ reviewerName, reviewText, rating });

    // איפוס השדות לאחר שליחה
    setReviewText("");
    setRating(0);
    setReviewerName("");
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full p-2 border rounded mb-2"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        placeholder="הכנס את שמך"
        required
      />
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="3"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="כתוב ביקורת..."
        required
      />
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-6 h-6 cursor-pointer ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mr-2"
        >
          ביטול
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          שלח ביקורת
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;

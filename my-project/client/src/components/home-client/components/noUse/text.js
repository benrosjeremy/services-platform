import React, { useState } from "react";

const NewServiceRequestForm = ({ categories, providers, cities, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      details,
      selectedCity,
      selectedCategory,
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">יצירת בקשת שירות חדשה</h2>
      <div className="mb-4">
        <label className="block font-medium">כותרת</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">פירוט</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">בחר עיר</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">בחר עיר</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">בחר קטגוריה</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">בחר קטגוריה</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">העלה תמונות</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        שלח בקשה
      </button>
    </form>
  );
};

export default NewServiceRequestForm;

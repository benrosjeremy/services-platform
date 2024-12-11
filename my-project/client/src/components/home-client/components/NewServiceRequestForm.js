

import React, { useState,useEffect } from "react";
import "./ServiceRequestForm.css";

function ServiceRequestForm({ onSubmit, cities, cityFilter, setCityFilter, resetForm }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [cityId, setCityId] = useState("");
  const [images, setImages] = useState([]); // מערך לשמירת תמונות

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("cityId", cityId);

    images.forEach((image) => {
      formData.append("images", image); // הוספת כל תמונה תחת השם "images"
    });

    onSubmit(formData);
  };

  useEffect(() => {
    if (resetForm) {
      handleReset();
    }
  }, [resetForm]);

  const handleReset = () => {
    setTitle("");
    setDetails("");
    setCityId("");
    setImages([]);
    setCityFilter(0);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // המרת FileList למערך
    setImages((prevImages) => [...prevImages, ...files]); // הוספת הקבצים החדשים
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <> <p>מלא את פרטי הבקשה, וסמן את בעלי המקצוע שמהם תרצה לקבל הצעות מחיר:</p><br/>
      <form className="form-container" onSubmit={handleSubmit}>
       
        <label className="form-item" htmlFor="cityId">
          עיר
        </label>
        <select
          style={{ width: "8rem" }}
          className="form-input"
          id="cityId"
          value={cityId}
          onChange={(e) => {
            const selectedCityId = parseInt(e.target.value);
            setCityId(selectedCityId); // עדכון הערך הנוכחי של העיר
            setCityFilter(selectedCityId); // עדכון הפילטר
          }}
          required
        >
          <option value="0">כל הערים</option> {/* אפשרות של כל הערים */}
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>

        <label className="form-item" htmlFor="title">
          כותרת
        </label>
        <input
          style={{ width: "12rem" }}
          className="form-input"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="form-item" htmlFor="details">
          פרטים
        </label>
        <textarea
          className="form-input"
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <div className="image-input">
          {/* שדה קלט מוסתר */}
          <input
            className="form-input file-input-hidden"
            type="file"
            id="upload-button"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {/* כפתור לדימוי פעולת ההעלאה */}
          <button
            className="image-button"
            type="button"
            onClick={() => document.getElementById("upload-button").click()}
          >
            העלה תמונות
          </button>
          <div className="image-count">{images.length} תמונות נבחרו</div>
        </div>
        <div className="form-buttons">
          <button className="submit-button button-input" type="submit">
            שלח
          </button>
          <button className="reset-button button-input" type="button" onClick={handleReset}>
            איפוס
          </button>
        </div>
      </form>
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-preview-item">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="image-preview-thumbnail"
            />
            <button
              type="button"
              className="remove-image-button"
              onClick={() => handleRemoveImage(index)}
            >
              ✖️
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ServiceRequestForm;

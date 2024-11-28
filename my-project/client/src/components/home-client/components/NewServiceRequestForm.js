import React, { useState } from "react";
import "./ServiceRequestForm.css";

function ServiceRequestForm({ onSubmit, cities }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [cityId, setCityId] = useState("");
  //const [serviceCategoryId, setServiceCategoryId] = useState("");
  //const [providers, setProviders] = useState(""); // A comma-separated list of provider IDs

  const handleSubmit = (e) => {
    e.preventDefault();

    // הוצאת הנתונים לשימוש ב- UserHome
    const serviceRequestData = {
      title,
      details,
      cityId,
      //serviceCategoryId,
      //providers: providers.split(",").map((id) => parseInt(id.trim())),
    };

    // שליחת הנתונים ל-UserHome
    onSubmit(serviceRequestData);
  };

  return (
    <form className="service-request-form" onSubmit={handleSubmit}>
      
      <div className="form-group title-group">
        <label htmlFor="title">כותרת:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group details-group">
        <label htmlFor="details">פרטים:</label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>
      <div className="form-group city-group">
        <label htmlFor="cityId">עיר:</label>
        <select
          id="cityId"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          required
        >
          <option value="">בחר עיר</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="form-group">
        <label htmlFor="serviceCategoryId">קטגוריית שירות:</label>
        <select
          id="serviceCategoryId"
          value={serviceCategoryId}
          onChange={(e) => setServiceCategoryId(e.target.value)}
          required
        >
          <option value="">בחר קטגוריה</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div> */}
      {/* <div className="form-group">
        <label htmlFor="providers">ספקים (מופרדים בפסיקים):</label>
        <input
          type="text"
          id="providers"
          value={providers}
          onChange={(e) => setProviders(e.target.value)}
          required
        />
      </div> */}
      <button className="submit-button" type="submit">
        שלח
      </button>
    </form>
  );
}

export default ServiceRequestForm;

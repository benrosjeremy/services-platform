import React, { useState } from "react";

function ServiceRequestForm({ onSubmit, cities, categories }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [cityId, setCityId] = useState("");
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [providers, setProviders] = useState(""); // A comma-separated list of provider IDs

  const handleSubmit = (e) => {
    e.preventDefault();

    // הוצאת הנתונים לשימוש ב- UserHome
    const serviceRequestData = {
      title,
      details,
      cityId,
      serviceCategoryId,
      providers: providers.split(",").map((id) => parseInt(id.trim())),
    };

    // שליחת הנתונים ל-UserHome
    onSubmit(serviceRequestData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Details:</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <select
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          required
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Service Category ID:</label>
        <select
          value={serviceCategoryId}
          onChange={(e) => setServiceCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Providers (comma-separated IDs):</label>
        <input
          type="text"
          value={providers}
          onChange={(e) => setProviders(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ServiceRequestForm;

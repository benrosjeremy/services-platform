import React, { useEffect, useState } from "react";
import ProviderCard from "./ProviderCard";

const ProvidersList = ({ categoryFilter, onSelectedProvidersChange }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState([]);

  // קריאה ל-API ברגע שהרכיב נטען
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/get-providers"
        );
        if (!response.ok) {
          throw new Error("בעיה בטעינת הנתונים");
        }
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // עדכון רשימת הספקים שנבחרו
  const handleProviderSelection = (id, isSelected) => {
    console.log("a-Checkbox changed" + id);
    const updatedSelectedProviders = isSelected
      ? [...selectedProviders, id]
      : selectedProviders.filter((providerId) => providerId !== id);

    setSelectedProviders(updatedSelectedProviders);

    // עדכון ההורה
    if (onSelectedProvidersChange) {
      onSelectedProvidersChange(updatedSelectedProviders);
    }
  };

  if (loading) {
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>שגיאה: {error}</div>;
  }

  const filteredProviders = categoryFilter
    ? providers.filter((provider) => provider.category_id === categoryFilter)
    : providers;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 provider-cards">
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            service={provider}
            isSelected={selectedProviders.includes(provider.id)}
            onSelectionChange={handleProviderSelection}
          />
        ))}
      </div>
    </div>
  );
};

export default ProvidersList;

import React, { useEffect, useState } from "react";
import ProviderCard from "./ProviderCard";

const ProvidersList = ({ categoryFilter }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // קריאה ל-API ברגע שהרכיב נטען
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Providers"); // עדכן את ה-API בהתאם
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <ProviderCard key={provider.id} service={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProvidersList;

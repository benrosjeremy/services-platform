import React, { useEffect, useState } from "react";
const CategoryList = ({ categoryFilter,setCategoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch(
          "http://localhost:5000/api/user/get-categories"
        );
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId); // שולחים את ה-ID של הקטגוריה
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-2">
        {" "}
        {/* הוספנו gap קטן כדי לשמור רווחים בין הכפתורים */}
        {categories.map((category) => (
          <label key={category.id} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category.id}
              className="hidden"
              onChange={() => handleCategoryChange(category.id)}
            />
            <div
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow w-full"
              style={{
                backgroundColor:
                  category.id === categoryFilter ? "#e0f7fa" : "", // צבע חלופי כשהכפתור נבחר
              }}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

// import React, { useEffect, useState } from "react";
// const CategoryList = ({ categoryFilter, setCategoryFilter }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoriesRes = await fetch(
//           "http://localhost:5000/api/user/get-categories"
//         );
//         const categoriesData = await categoriesRes.json();
//         setCategories(categoriesData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCategoryChange = (categoryId) => {
//     setCategoryFilter(categoryId); // שולחים את ה-ID של הקטגוריה
//   };

//   return (
//     <div className="container mx-auto px-4 category-list">
//       <div className="flex gap-2">
//         {" "}
//         {/* הוספנו gap קטן כדי לשמור רווחים בין הכפתורים */}
//         {categories.map((category) => (
//           <label key={category.id} className="flex-1 cursor-pointer">
//             <input
//               type="radio"
//               name="category"
//               value={category.id}
//               className="hidden"
//               onChange={() => handleCategoryChange(category.id)}
//             />
//             <div
//               className="bg-white rounded-lg shadow-md p-6 text-center transition-shadow w-full shadow-top"
//               style={{
//                 backgroundColor:
//                   category.id === categoryFilter ? "#edf0ed" : "", // צבע חלופי כשהכפתור נבחר
//               }}
//             >
//               <div className="text-3xl mb-2">{category.icon}</div>
//               <div className="font-medium">{category.name}</div>
//             </div>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;

import "./ServiceRequestForm.css";
import React, { useEffect, useState, useRef } from "react";

const CategoryList = ({ categoryFilter, setCategoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

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
    setCategoryFilter(categoryId);
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4">
      {loading && <p>טוען...</p>}
      {error && <p>שגיאה: {error}</p>}
      {!loading && !error && (
        <div className="relative flex items-center">
          {/* <p>אנא בחר בעל מקצוע:</p> */}
          <br/>
          <button
            className="absolute left-0 bg-gray-200 p-2 rounded-full shadow-md"
            onClick={scrollLeft}
            style={{ zIndex: 10 }}
          >
            {"<"}
          </button>
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto w-full no-scrollbar"
            style={{
              width: "100%", // הרחבה ל-100% של הרוחב
            }}
          >
            {categories.map((category) => (
              <label
                key={category.id}
                className="w-full max-w-xs flex-shrink-0"
              >
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  className="hidden"
                  onChange={() => handleCategoryChange(category.id)}
                />
                <div
                  className="bg-white rounded-lg shadow-md p-6 text-center transition-shadow shadow-top"
                  style={{
                    backgroundColor:
                      category.id === categoryFilter ? "#d8e8da" : "",
                    width: "300px",
                    marginBottom: "10px",
                    marginTop: "15px",
                  }}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                </div>
              </label>
            ))}
          </div>
          <button
            className="absolute right-0 bg-gray-200 p-2 rounded-full shadow-md"
            onClick={scrollRight}
            style={{ zIndex: 10 }}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;

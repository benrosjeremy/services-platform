import React, { useEffect, useState } from "react";
const CategoryList = ({ setCategoryFilter, categories }) => {
  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId); // שולחים את ה-ID של הקטגוריה
  };

  
  // const categories = [
  //   { name: "שיפוצים", icon: "🏠" },
  //   { name: "חשמל", icon: "⚡" },
  //   { name: "אינסטלציה", icon: "🔧" },
  //   { name: "ניקיון", icon: "🧹" },
  //   { name: "הובלות", icon: "🚚" },
  //   { name: "גינון", icon: "🌱" },
  // ];

  return (<div className="container mx-auto px-4 py-12">
  <div className="flex gap-2"> {/* הוספנו gap קטן כדי לשמור רווחים בין הכפתורים */}
    {categories.map((category) => (
      <label
        key={category.id}
        className="flex-1 cursor-pointer"
      >
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
            backgroundColor: category.id === setCategoryFilter ? "#e0f7fa" : "",  // צבע חלופי כשהכפתור נבחר
          }}
        >
          <div className="text-3xl mb-2">{category.icon}</div>
          <div className="font-medium">{category.name}</div>
        </div>
      </label>
    ))}
  </div>
</div>

    // <div className="container mx-auto px-4 py-12">
    //   <div className="flex gap-4">
    //     {categories.map((category) => (
    //       <label key={category.id} className="cursor-pointer">
    //         <input
    //           type="radio"
    //           name="category"
    //           value={category.id}
    //           className="hidden"
    //           onChange={() => handleCategoryChange(category.id)} // שינוי כאן
    //         />
    //         <div
    //           className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
    //           style={{
    //             backgroundColor: category.id === setCategoryFilter ? "#e0f7fa" : "",
    //           }}
    //         >
    //           <div className="text-3xl mb-2">{category.icon}</div>
    //           <div className="font-medium">{category.name}</div>
    //         </div>
    //       </label>
    //     ))}
    //   </div>
    // </div>
  );
};

export default CategoryList;

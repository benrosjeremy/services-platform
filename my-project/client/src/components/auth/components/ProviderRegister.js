// import React, { useState } from 'react';
// import axios from 'axios';

// const ProviderRegister = () => {
//   const [provider, setProvider] = useState({
//     name: '', email: '', password: '', phone: '', city: ''
//   });

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://localhost:5000/register-provider', provider);
//       alert('Registration successful');
//     } catch (error) {
//       alert('Registration failed');
//     }
//   };
// return (
//     <div className="auth-container">
//       <h2 className="auth-title">Register Provider</h2>
//       <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           className="form-input"
//           placeholder="Name"
//           onChange={(e) => setProvider({...provider, name: e.target.value})}
//         />
//         <input
//           type="email"
//           className="form-input"
//           placeholder="Email"
//           onChange={(e) => setProvider({...provider, email: e.target.value})}
//         />
//         <input
//           type="password"
//           className="form-input"
//           placeholder="Password"
//           onChange={(e) => setProvider({...provider, password: e.target.value})}
//         />
//         <input
//           type="tel"
//           className="form-input"
//           placeholder="Phone"
//           onChange={(e) => setProvider({...provider, phone: e.target.value})}
//         />
//         <input
//           type="text"
//           className="form-input"
//           placeholder="City"
//           onChange={(e) => setProvider({...provider, city: e.target.value})}
//         />
//         <button className="submit-button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };
// export default ProviderRegister;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../commons/PopupContext";
const ProviderRegister = () => {
  const { showPopupMessage } = usePopup();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provider, setProvider] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city_id: "",
    title: "",
    service_description: "",
    category_id: "", // קטגוריית השירות
    logo: null, // קובץ הלוגו
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  // טוען את רשימת הערים וקטגוריות השירות
  useEffect(() => {
    const fetchCitiesAndCategories = async () => {
      try {
        // שליפת הערים
        const citiesResponse = await axios.get(
          "http://localhost:5000/api/user/get-cities"
        );
        setCities(citiesResponse.data);

        // שליפת הקטגוריות
        const categoriesResponse = await axios.get(
          "http://localhost:5000/api/user/get-categories"
        );
        setCategories(categoriesResponse.data); // עדכון סטייט עם הקטגוריות
      } catch (error) {
        console.error("Error loading cities and categories:", error);
      }
    };

    fetchCitiesAndCategories();
  }, []);

  const handleLogoUpload = (e) => {
    console.log(e.target.files[0]);
    setProvider({ ...provider, logo: e.target.files[0] });
  };

  // const handleRegister = async () => {
  //   try {
  //     // יצירת FormData כדי לשלוח גם את הקובץ
  //     const formData = new FormData();
  //     for (const key in provider) {
  //       formData.append(key, provider[key]);
  //     }
  //     for (const pair of formData.entries()) {
  //       console.log(pair[0] + ": ", pair[1]);
  //     }
  //     await axios.post(
  //       "http://localhost:5000/api/auth/register-provider",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     alert("Registration successful");
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     alert("Registration failed");
  //   }
  // };
  const handleRegister = async () => {
    try {
      const formData = new FormData();
      for (const key in provider) {
        formData.append(key, provider[key]);
      }

      await axios.post(
        "http://localhost:5000/api/auth/register-provider",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showPopupMessage("הפעולה בוצעה בהצלחה!");

      // הצגת הודעת הצלחה
      // setPopupMessage("הרישום בוצע בהצלחה!");
      // setShowPopup(true);

      // מעבר לדף הבית אחרי השהיה
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);

      // הצגת הודעת כישלון
      setPopupMessage("הרישום נכשל. נסה שוב.");
      setShowPopup(true);

      // סגירת המודאל אחרי כמה שניות
      setTimeout(() => setShowPopup(false), 2000);
    }
  };
  return (
    <div className="auth-container">
      <h2 className="auth-title">רישום בעל מקצוע</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="form-input"
          placeholder="שם"
          onChange={(e) => setProvider({ ...provider, name: e.target.value })}
        />
        <input
          type="email"
          className="form-input"
          placeholder="אימייל"
          onChange={(e) => setProvider({ ...provider, email: e.target.value })}
        />
        <input
          type="password"
          className="form-input"
          placeholder="סיסמא"
          onChange={(e) =>
            setProvider({ ...provider, password: e.target.value })
          }
        />
        <input
          type="tel"
          className="form-input"
          placeholder="טלפון"
          onChange={(e) => setProvider({ ...provider, phone: e.target.value })}
        />
        <input
          type="text"
          className="form-input"
          placeholder="כּוֹתֶרֶת"
          onChange={(e) => setProvider({ ...provider, title: e.target.value })}
        />
        <input
          type="text"
          className="form-input"
          placeholder="תיאור השירות"
          onChange={(e) =>
            setProvider({ ...provider, service_description: e.target.value })
          }
        />

        {/* בחירת עיר */}
        <select
          className="form-select"
          value={provider.city_id}
          onChange={(e) =>
            setProvider({ ...provider, city_id: e.target.value })
          }
        >
          <option value="">בחר עיר</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.city_name}
            </option>
          ))}
        </select>

        {/* בחירת קטגוריית שירות */}
        <select
          className="form-select"
          value={provider.category_id}
          onChange={(e) =>
            setProvider({ ...provider, category_id: e.target.value })
          }
        >
          <option value="">בחר קטגוריית שירות</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* העלאת לוגו */}
        <label className="form-label">:העלה לוגו</label>
        <input
          type="file"
          className="form-input"
          accept="image/*"
          onChange={handleLogoUpload}
        />

        <button className="submit-button" onClick={handleRegister}>
          הירשם
        </button>
      </form>
    </div>
  );
};

export default ProviderRegister;

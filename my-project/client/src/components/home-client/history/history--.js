import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientRequestsHistory.css";

const ClientRequestsHistory = ({ clientId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
    type: "all",
  });
  const [modalData, setModalData] = useState(null); // לניהול המודאל

  // רשימת סוגי הבקשות
  const requestTypes = [
    "גינון",
    "הובלות",
    "ניקיון",
    "אינסטלציה",
    "חשמל",
    "שיפוצים",
  ];

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await axios.post("/api/client/history", {
          clientId: clientId.user_id,
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error loading client requests history:", error);
      }
    };

    if (clientId) loadRequests();
  }, [clientId]);


  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  // סינון ומיון הבקשות
  const filteredRequests = requests
  .filter((request) => {
    const { status, date, type } = filters;
    let matches = true;

    if (status !== "all" && request.provider_status !== status) matches = false;
    if (date && !new Date(request.request_created_at).toISOString().startsWith(date)) matches = false;
    if (type !== "all" && request.category_name !== type) matches = false;

    return matches;
  })
  .sort((a, b) => new Date(b.request_created_at) - new Date(a.request_created_at));


  const handleDelete = async (requestId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הבקשה?")) {
      try {
        await axios.delete(`/api/client/delete-request/${requestId}`);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
//     <div className="page-container">
//       <h1 className="page-header">היסטוריית בקשות</h1>

//       {/* Filters Section */}
//       <div className="filters-container">
//         <select
//           value={filters.status}
//           onChange={(e) => handleFilterChange("status", e.target.value)}
//         >
//           <option value="all">כל הסטטוסים</option>
//           <option value="בהמתנה">בהמתנה</option>
//           <option value="אושר">אושר</option>
//           <option value="נדחה">נדחה</option>
//         </select>

//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => handleFilterChange("date", e.target.value)}
//         />

//         <select
//           value={filters.type}
//           onChange={(e) => handleFilterChange("type", e.target.value)}
//         >
//           <option value="all">כל סוגי הבקשות</option>
//           {requestTypes.map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Requests List */}
//       {filteredRequests.length === 0 ? (
//         <p>לא נמצאו בקשות התואמות את הסינון.</p>
//       ) : (
//         filteredRequests.map((request) => (
//           <div key={request.id} className="request-card">
//             <p>
//               <strong>תיאור הבעיה:</strong> {request.request_details}
//             </p>
//             <p>
//               <strong>תאריך:</strong>{" "}
//               {new Date(request.request_created_at).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>סטטוס:</strong> {request.provider_status}
//             </p>
//             {request.provider_status === "אושר" && (
//   <p>
//     <strong>מחיר:</strong> {request.provider_price}ש"ח
//   </p>
// )}
            
//             <p>
//               <strong>סוג בקשה:</strong> {request.category_name}
//             </p>
//             {request.response && (
//               <p>
//                 <strong>תשובת ספק:</strong> {request.response}
//               </p>
//             )}

//             <div className="button-container">
//               <button
//                 className="button details-button"
//                 onClick={() => alert(`פרטים של הספק:
//                    ${request.provider_phone}
//                   ${request.provider_name}`)}
//               >
//                 פרטי ספק
//               </button>
//               <button
//                 className="button delete-button"
//                 onClick={() => handleDelete(request.id)}
//               >
//                 מחק בקשה
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
<div className="page-container">
      <h1 className="page-header">היסטוריית בקשות</h1>

      {/* Filters Section */}
      <div className="filters-container">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="all">כל הסטטוסים</option>
          <option value="בהמתנה">בהמתנה</option>
          <option value="אושר">אושר</option>
          <option value="נדחה">נדחה</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        />

        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="all">כל סוגי הבקשות</option>
          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <p>לא נמצאו בקשות התואמות את הסינון.</p>
      ) : (
        filteredRequests.map((request) => (
          <div key={request.id} className="request-card">
            <p>{request.category_icon}</p>
            <p>
              <strong>תיאור הבעיה:</strong> {request.request_details}
            </p>
            <p>
              <strong>תאריך:</strong>{" "}
              {new Date(request.request_created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>סטטוס:</strong> {request.provider_status}
            </p>
            {request.provider_status === "אושר" && (
              <p>
                <strong>מחיר:</strong> {request.provider_price} ש"ח
              </p>
            )}
            <p>
              <strong>סוג בקשה:</strong> {request.category_name}
            </p>
            {request.response && (
              <p>
                <strong>תשובת ספק:</strong> {request.response}
              </p>
            )}

            <div className="button-container">
            <button
              onClick={togglePopup}
              className="text-white px-4 py-2 rounded transition-colors details-button"
            >
              פרטים ספק
            </button>
              
              <button
                className="button delete-button"
                onClick={() => handleDelete(request.id)}
              >
                מחק בקשה
              </button>
            </div>
          </div>
        ))
      )}

{isPopupOpen && (
        <ProviderPopup provider={service} onClose={togglePopup} />
      )}
    </div>
  );
};

export default ClientRequestsHistory;

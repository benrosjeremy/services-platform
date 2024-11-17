// import React, { useState, useEffect } from "react";

// import "../App.css";
// import ProvidersList from "../components/ProvidersList";

// const ProviderHome = () => {
//   return <div></div>;

// };

// export default ProviderHome;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './ProviderHome.css';

// const ProviderHome = () => {

//   const [requests, setRequests] = useState([]);
//   const { providerId } = useParams();

//   useEffect(() => {
//     const loadRequests = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/requests/${providerId}`);
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error('Error loading requests:', error);
//       }
//     };
//     if (providerId) loadRequests();
//   }, [providerId]);

//   const handleApprove = async (requestId) => {
//     const price = prompt('אנא הכנס את הצעת המחיר:');
//     if (!price) {
//       alert("לא הוזנה הצעת מחיר.");
//       return;
//     }
//     try {
//       await fetch(`http://localhost:3001/api/requests/${requestId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'approved', price }),
//       });
//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.id === requestId ? { ...req, status: 'approved', price } : req
//         )
//       );
//     } catch (error) {
//       console.error('Error approving request:', error);
//     }
//   };

//   const handleReject = async (requestId) => {
//     try {
//       await fetch(`http://localhost:3001/api/requests/${requestId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: 'rejected', price: null }),
//       });
//       setRequests((prevRequests) =>
//         prevRequests.map((req) =>
//           req.id === requestId ? { ...req, status: 'rejected', price: null } : req
//         )
//       );
//     } catch (error) {
//       console.error('Error rejecting request:', error);
//     }
//   };

//   return (
//     <div className="page-container">
//       console.log(useParams);

//       <h1 className="page-header">בקשות שהתקבלו</h1>
//       {requests.map((request) => (
//         <div key={request.id} className="request-card">
//           <p><strong>תיאור הבעיה:</strong> {request.description}</p>
//           <p><strong>עיר:</strong> {request.city}</p>
//           <p><strong>תאריך:</strong> {new Date(request.date).toLocaleDateString()}</p>
//           <p><strong>סטטוס:</strong> {request.status}</p>
//           {request.price && (
//             <p><strong>הצעת מחיר:</strong> <span className="price">{request.price} ש"ח</span></p>
//           )}
//           {request.status === 'pending' && (
//             <div className="button-container">
//               <button
//                 className="button approve-button"
//                 onClick={() => handleApprove(request.id)}
//               >
//                 מלאות הצעת מחיר
//               </button>
//               <button
//                 className="button reject-button"
//                 onClick={() => handleReject(request.id)}
//               >
//                 דחה בקשה
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProviderHome;
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./ProviderHome.css";

const ProviderHome = ({ provider }) => {
  const [requests, setRequests] = useState([]);
  console.log(provider);

  useEffect(() => {
    const loadRequests = async () => {
      console.log("provider id " + provider.id);
      try {
        const response = await axios.post(
          "/api/provider/get-service-requests",
          {
            providerId: provider.id,
          }
        );
        //const data = await response.json();
        setRequests(response.data);
      } catch (error) {
        console.error("Error loading requests:", error);
      }
    };
    if (provider) loadRequests();
  }, [provider]);

  const handleApprove = async (requestId) => {
    const price = prompt("אנא הכנס את הצעת המחיר:");
    if (!price) {
      alert("לא הוזנה הצעת מחיר.");
      return;
    }
    try {
      await fetch(`http://localhost:3000/api/requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", price }),
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: "approved", price } : req
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await fetch(`http://localhost:3000/api/requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", price: null }),
      });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId
            ? { ...req, status: "rejected", price: null }
            : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="page-container">
      <div>{/* {provider.name} - {provider.id} */}</div>
      <h1 className="page-header">בקשות שהתקבלו</h1>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <p>
            <strong>תיאור הבעיה:</strong> {request.details}
          </p>
          <p>
            <strong>עיר:</strong> {request.cityId}
          </p>
          <p>
            <strong>תאריך:</strong>{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>סטטוס:</strong>
          </p>
          {request.price && (
            <p>
              <strong>הצעת מחיר:</strong> <span className="price"> ש"ח</span>
            </p>
          )}
          {request.status === "pending" && (
            <div className="button-container">
              <button
                className="button approve-button"
                onClick={() => handleApprove(request.id)}
              >
                מלאות הצעת מחיר
              </button>
              <button
                className="button reject-button"
                onClick={() => handleReject(request.id)}
              >
                דחה בקשה
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProviderHome;

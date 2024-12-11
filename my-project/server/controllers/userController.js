{
  // const bcrypt = require("bcrypt");
  // const jwt = require("jsonwebtoken");
  // const db = require("../models/db");
  // const createServiceRequest = async (req, res) => {
  //   const { title, details, cityId, serviceCategoryId, providers, userId } =
  //     req.body;
  //   console.log("Service request data:", req.body);
  //   // בדיקת קלט
  //   if (
  //     !title ||
  //     !details ||
  //     !cityId ||
  //     !serviceCategoryId ||
  //     !Array.isArray(providers)
  //   ) {
  //     return res.status(400).json({ message: "Invalid input data" });
  //   }
  //   // התחלת טרנזקציה
  //   db.beginTransaction((err) => {
  //     if (err) {
  //       console.error("Error starting transaction:", err);
  //       return res.status(500).json({ message: "Error starting transaction" });
  //     }
  //     // Insert into service_requests
  //     db.execute(
  //       `INSERT INTO service_requests (title, details, cityId, serviceCategoryId, createdAt, userId)
  //        VALUES (?, ?, ?, ?, NOW(),?)`,
  //       [title, details, cityId, serviceCategoryId, userId],
  //       (err, result) => {
  //         if (err) {
  //           console.error("Error inserting into service_requests:", err);
  //           return db.rollback(() => {
  //             res
  //               .status(500)
  //               .json({ message: "Error inserting service request" });
  //           });
  //         }
  //         const serviceRequestId = result.insertId;
  //         console.log("Service request inserted:", result);
  //         // Insert into service_request_providers
  //         const providerValues = providers.map((providerId) => [
  //           serviceRequestId,
  //           providerId,
  //           null, // price placeholder (will be updated later)
  //         ]);
  //         db.query(
  //           `INSERT INTO service_request_providers (serviceRequestId, serviceProviderId, price)
  //            VALUES ?`,
  //           [providerValues],
  //           (err) => {
  //             if (err) {
  //               console.error(
  //                 "Error inserting into service_request_providers:",
  //                 err
  //               );
  //               return db.rollback(() => {
  //                 res
  //                   .status(500)
  //                   .json({ message: "Error inserting service providers" });
  //               });
  //             }
  //             // Commit the transaction
  //             db.commit((err) => {
  //               if (err) {
  //                 console.error("Error committing transaction:", err);
  //                 return db.rollback(() => {
  //                   res
  //                     .status(500)
  //                     .json({ message: "Error committing transaction" });
  //                 });
  //               }
  //               console.log("Transaction committed successfully");
  //               res
  //                 .status(201)
  //                 .json({ message: "Service request added successfully" });
  //             });
  //           }
  //         );
  //       }
  //     );
  //   });
  // };
  // const GetCategories = async (req, res) => {
  //   const query = "SELECT * FROM service_web.service_categories"; // כאן תשים את שם הטבלה שלך
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "אירעה שגיאה בשרת" });
  //     } else {
  //       res.json(results); // שולחים את התוצאות כ-JSON
  //     }
  //   });
  // };
  // const GetCities = async (req, res) => {
  //   const query = "SELECT * FROM service_web.cities"; // כאן תשים את שם הטבלה שלך
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "אירעה שגיאה בשרת" });
  //     } else {
  //       res.json(results); // שולחים את התוצאות כ-JSON
  //     }
  //   });
  // };
  // const GetProviders = async (req, res) => {
  //   const query = "SELECT * FROM service_web.service_providers"; // כאן תשים את שם הטבלה שלך
  //   db.query(query, (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: "אירעה שגיאה בשרת" });
  //     } else {
  //       res.json(results); // שולחים את התוצאות כ-JSON
  //     }
  //   });
  // };
  // module.exports = {
  //   createServiceRequest,
  //   GetCategories,
  //   GetCities,
  //   GetProviders,
  // };}
}

{
  // const nodemailer = require("nodemailer");
  // const bcrypt = require("bcrypt");
  // const jwt = require("jsonwebtoken");
  // const db = require("../models/db");
  // require('dotenv').config();
  // // הגדרת טרנספורטר לשליחת מיילים
  // const transporter = nodemailer.createTransport({
  //   service: "gmail", // ספק הדוא"ל, ניתן לשנות אם צריך
  //   auth: {
  //     user: process.env.GMAIL_USER, // כתובת האימייל שלך
  //     pass: process.env.GMAIL_API_KEY // הסיסמה לאימייל (או token במקרה של Gmail)
  //   },
  // });
  // // פונקציה לשליחת מיילים
  // const sendMailToProvider = (email, serviceRequestTitle) => {
  //   const mailOptions = {
  //     from: process.env.GMAIL_USER,
  //     to: email,
  //     subject: "בקשת שירות חדשה",
  //     text: `שלום,\n\nיש לך בקשת שירות חדשה: ${serviceRequestTitle}.\nאנא היכנס למערכת לצפייה בפרטים נוספים.\n\nבברכה,\nהמקצוען`,
  //   };
  //   return transporter.sendMail(mailOptions);
  // };
  // const createServiceRequest = async (req, res) => {
  //   const { title, details, cityId, serviceCategoryId, providers, userId } =
  //     req.body;
  //   console.log("Service request data:", req.body);
  //   if (
  //     !title ||
  //     !details ||
  //     !cityId ||
  //     !serviceCategoryId ||
  //     !Array.isArray(providers)
  //   ) {
  //     return res.status(400).json({ message: "Invalid input data" });
  //   }
  //   db.beginTransaction((err) => {
  //     if (err) {
  //       console.error("Error starting transaction:", err);
  //       return res.status(500).json({ message: "Error starting transaction" });
  //     }
  //     db.execute(
  //       `INSERT INTO service_requests (title, details, cityId, serviceCategoryId, createdAt, userId)
  //        VALUES (?, ?, ?, ?, NOW(), ?)`,
  //       [title, details, cityId, serviceCategoryId, userId],
  //       (err, result) => {
  //         if (err) {
  //           console.error("Error inserting into service_requests:", err);
  //           return db.rollback(() => {
  //             res
  //               .status(500)
  //               .json({ message: "Error inserting service request" });
  //           });
  //         }
  //         const serviceRequestId = result.insertId;
  //         const providerValues = providers.map((providerId) => [
  //           serviceRequestId,
  //           providerId,
  //           null,
  //         ]);
  //         db.query(
  //           `INSERT INTO service_request_providers (serviceRequestId, serviceProviderId, price)
  //            VALUES ?`,
  //           [providerValues],
  //           (err) => {
  //             if (err) {
  //               console.error(
  //                 "Error inserting into service_request_providers:",
  //                 err
  //               );
  //               return db.rollback(() => {
  //                 res
  //                   .status(500)
  //                   .json({ message: "Error inserting service providers" });
  //               });
  //             }
  //             // שליחת מיילים לכל Provider
  //             const emailsQuery = `SELECT email FROM service_web.service_providers WHERE id IN (?)`;
  //             db.query(emailsQuery, [providers], (err, results) => {
  //               if (err) {
  //                 console.error("Error fetching provider emails:", err);
  //                 return db.rollback(() => {
  //                   res.status(500).json({ message: "Error fetching emails" });
  //                 });
  //               }
  //               const emailPromises = results.map((provider) =>
  //                 sendMailToProvider(provider.email, title)
  //               );
  //               Promise.all(emailPromises)
  //                 .then(() => {
  //                   db.commit((err) => {
  //                     if (err) {
  //                       console.error("Error committing transaction:", err);
  //                       return db.rollback(() => {
  //                         res
  //                           .status(500)
  //                           .json({ message: "Error committing transaction" });
  //                       });
  //                     }
  //                     console.log("Transaction committed and emails sent.");
  //                     res
  //                       .status(201)
  //                       .json({ message: "Service request added successfully" });
  //                   });
  //                 })
  //                 .catch((emailError) => {
  //                   console.error("Error sending emails:", emailError);
  //                   db.rollback(() => {
  //                     res
  //                       .status(500)
  //                       .json({ message: "Error sending emails to providers" });
  //                   });
  //                 });
  //             });
  //           }
  //         );
  //       }
  //     );
  //   });
  // };
  // module.exports = {
  //   createServiceRequest,
  //   GetCategories,
  //   GetCities,
  //   GetProviders,
  // };
}

const nodemailer = require("nodemailer");
const db = require("../models/db");
require("dotenv").config();

// הגדרת טרנספורטר לשליחת מיילים
const transporter = nodemailer.createTransport({
  service: "gmail", // ספק הדוא"ל, ניתן לשנות אם צריך
  auth: {
    user: process.env.GMAIL_USER, // כתובת האימייל שלך
    pass: process.env.GMAIL_API_KEY, // הסיסמה לאימייל (או token במקרה של Gmail)
  },
});

// // פונקציה לשליחת מיילים
// const sendMailToProvider = (email, serviceRequestTitle) => {
//   const mailOptions = {
//     from: process.env.GMAIL_USER,
//     to: email,
//     subject: "בקשת שירות חדשה",
//     text: `שלום,\n\nיש לך בקשת שירות חדשה: ${serviceRequestTitle}.\nאנא היכנס למערכת לצפייה בפרטים נוספים.\n\nבברכה,\nהמקצוען`,
//   };

//   return transporter.sendMail(mailOptions);
// };
const sendMailToProvider = async (email, serviceRequestTitle) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "בקשת שירות חדשה",
    text: `שלום,\n\nיש לך בקשת שירות חדשה: ${serviceRequestTitle}.\nאנא היכנס למערכת לצפייה בפרטים נוספים.\n\nבברכה,\nהמקצוען`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
    // throw new Error("Error sending email");
  }
};
// const createServiceRequest = async (req, res) => {
//   const { title, details, cityId, serviceCategoryId, providers, userId } = req.body;
//   console.log("Service request data:", req.body);

//   if (!title || !details || !cityId || !serviceCategoryId || !Array.isArray(providers)) {
//     return res.status(400).json({ message: "Invalid input data" });
//   }

//   const connection = await db.getConnection(); // מקבל את החיבור למסד הנתונים
//   try {
//     await connection.beginTransaction(); // מתחיל טרנזאקציה

//     // יצירת בקשת שירות
//     const result = await connection.execute(
//       `INSERT INTO service_requests (title, details, cityId, serviceCategoryId, createdAt, userId)
//        VALUES (?, ?, ?, ?, NOW(), ?)`,
//       [title, details, cityId, serviceCategoryId, userId]
//     );
//     const serviceRequestId = result[0].insertId;

//     // יצירת קשר עם ספקי השירות
//     const providerValues = providers.map((providerId) => [serviceRequestId, providerId, null]);
//     await connection.query(
//       `INSERT INTO service_request_providers (serviceRequestId, serviceProviderId, price)
//        VALUES ?`,
//       [providerValues]
//     );

//     // שליחת מיילים לכל ספק שירות
//     const [emails] = await connection.query(
//       `SELECT email FROM service_web.service_providers WHERE id IN (?)`,
//       [providers]
//     );

//     const emailPromises = emails.map((provider) =>
//       sendMailToProvider(provider.email, title)
//     );

//     await Promise.all(emailPromises); // מחכה שכל המיילים יישלחו

//     // סיום טרנזאקציה
//     await connection.commit();
//     console.log("Transaction committed and emails sent.");
//     res.status(201).json({ message: "Service request added successfully" });

//   } catch (err) {
//     console.error("Error during service request creation:", err);
//     await connection.rollback(); // אם קרתה שגיאה, מבטל את הטרנזאקציה
//     res.status(500).json({ message: "Error creating service request" });
//   } finally {
//     connection.release(); // שחרור החיבור למסד הנתונים
//   }
// };
const createServiceRequest = (req, res) => {
  const { title, details, cityId, serviceCategoryId, providers, userId } =
    req.body;
  const files = req.files;
  console.log("Service request data:", req.body);
  console.log("Received files:", files);
  console.log("פרםהןגקרד:", providers);
  console.log("פרםהןגקרד:", serviceCategoryId);

  const inputerrors = [];

  if (!title) {
    inputerrors.push("חובה להזין כותרת");
  }

  if (!details) {
    inputerrors.push("חובה להזין פרטים");
  }

  if (!cityId) {
    inputerrors.push("חובה לבחור עיר");
  }

  if (!serviceCategoryId) {
    inputerrors.push("חובה לבחור קטגוריית שירות");
  }

  if (!Array.isArray(providers)) {
    inputerrors.push("חובה לבחור ספקי שירות");
  }

  if (inputerrors.length > 0) {
    return res.status(400).json({ message: inputerrors.join(", ") });
  }

  console.log("1");
  // להתחיל טרנזקציה
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Error starting transaction" });
    }

    // ביצוע השאילתא הראשונה להוספת בקשה לשירות
    db.query(
      `INSERT INTO service_requests (title, details, cityId, serviceCategoryId, createdAt, userId)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [title, details, cityId, serviceCategoryId, userId],
      (err, result) => {
        if (err) {
          console.error("Error inserting service request:", err);
          return db.rollback(() => {
            res
              .status(500)
              .json({ message: "Error inserting service request" });
          });
        }

        const serviceRequestId = result.insertId; // הגדרת ID של הבקשה בתוך הקולבק

        // המשך הקוד כאן, כולל הוספת ספקי השירות
        const providerValues = providers.map((providerId) => [
          serviceRequestId,
          providerId,
          null,
        ]);

        db.query(
          `INSERT INTO service_request_providers (serviceRequestId, serviceProviderId, price)
           VALUES ?`,
          [providerValues],
          (err) => {
            if (err) {
              console.error("Error inserting service request providers:", err);
              return db.rollback(() => {
                res
                  .status(500)
                  .json({ message: "Error inserting service providers" });
              });
            }

            // המשך שליחת מיילים וכו'
            const emailsQuery = `SELECT email FROM service_providers WHERE id IN (?)`;
            db.query(emailsQuery, [providers], (err, emails) => {
              if (err) {
                console.error("Error fetching emails:", err);
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ message: "Error fetching provider emails" });
                });
              }

              emails.forEach((provider) => {
                sendMailToProvider(provider.email, title);
              });

              // הוספת קבצי התמונות
              if (files && files.length > 0) {
                const imagePaths = files.map((file) => [
                  serviceRequestId,
                  `${file.filename}`, // נתיב יחסי לקובץ
                  new Date(),
                ]);

                db.query(
                  `INSERT INTO service_images (serviceRequestId, path, createdAt)
                   VALUES ?`,
                  [imagePaths],
                  (err) => {
                    if (err) {
                      console.error("Error inserting images:", err);
                      return db.rollback(() => {
                        res
                          .status(500)
                          .json({ message: "Error inserting service images" });
                      });
                    }
                  }
                );
              }
              // סיום הטרנזקציה
              db.commit((err) => {
                if (err) {
                  console.error("Error committing transaction:", err);
                  return db.rollback(() => {
                    res
                      .status(500)
                      .json({ message: "Error committing transaction" });
                  });
                }

                res.status(201).json({
                  message: "Service request added successfully",
                });
              });
            });
          }
        );
      }
    );
  });
};

const addReview = (req, res) => {
  const { providerId, reviewerName, reviewText, rating } = req.body;

  // בדיקות קלט בסיסיות
  if (!providerId || !reviewerName || !reviewText || !rating) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  // שאילתה להוספת ביקורת
  const sql = `
    INSERT INTO service_web.reviews (provider_id, reviewer_name, review_text, rating)
    VALUES (?, ?, ?, ?)
  `;

  // ביצוע השאילתה
  db.query(
    sql,
    [providerId, reviewerName, reviewText, rating],
    (err, results) => {
      if (err) {
        console.error("Error inserting review:", err);
        return res.status(500).json({ error: "Failed to add review" });
      }

      // החזרה של התוצאה למשתמש
      res.status(201).json({
        success: true,
        message: "Review added successfully",
        reviewId: results.insertId, // מזהה הביקורת שהתווספה
      });
    }
  );
};

const GetCategories = async (req, res) => {
  const query = "SELECT * FROM service_web.service_categories"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

const GetReviews = async (req, res) => {
  const providerId = req.query.providerId;

  // בדיקת פרמטר חובה
  if (!providerId) {
    return res.status(400).json({ error: "Missing providerId parameter" });
  }

  // שאילתה לשליפת הביקורות
  const sql = `
    SELECT 
      id, reviewer_name, review_text, rating, created_at
    FROM 
      service_web.reviews
    WHERE 
      provider_id = ?
    ORDER BY 
      created_at DESC;
  `;

  // ביצוע השאילתה
  db.query(sql, [providerId], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }

    // שליחת הביקורות כ-JSON ללקוח
    res.json({ reviews: results });
  });
};

const GetCities = async (req, res) => {
  const query = "SELECT * FROM service_web.cities"; // כאן תשים את שם הטבלה שלך
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

const GetProviders = async (req, res) => {
  const query = `
    SELECT 
      sp.*,
      c.city_name AS city
    FROM 
      service_web.service_providers sp
    LEFT JOIN 
      service_web.cities c
    ON 
      sp.city_id = c.id
  `; // שילוב נתוני ערים
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "אירעה שגיאה בשרת" });
    } else {
      res.json(results); // שולחים את התוצאות כ-JSON
    }
  });
};

module.exports = {
  createServiceRequest,
  GetCategories,
  GetCities,
  GetProviders,
  GetReviews,
  addReview,
};

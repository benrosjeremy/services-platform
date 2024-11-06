const express = require('express');
const router = express.Router();

// דוגמה לנתיב לקבלת שירותים
router.get('/', (req, res) => {
    // כאן תוכל להחזיר רשימת שירותים מהבסיס נתונים
    res.send('List of services');
});

// דוגמה לנתיב להוספת שירות
router.post('/', (req, res) => {
    // כאן תוכל להוסיף שירות חדש לבסיס נתונים
    res.send('Service added');
});

module.exports = (db) => {
    return router;
};

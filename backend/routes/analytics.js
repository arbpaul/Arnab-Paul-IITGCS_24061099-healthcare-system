const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Route: GET /api/analytics
router.get('/', async (req, res) => {
  try {
    // 1. Number of patients per condition
    const patientsPerCondition = await Patient.aggregate([
      { $unwind: "$medicalHistory" },
      { $group: { _id: "$medicalHistory", count: { $sum: 1 } } }
    ]);

    // 2. Most prescribed medications
    const mostPrescribed = await Patient.aggregate([
      { $unwind: "$currentPrescriptions" },
      { $group: { _id: "$currentPrescriptions", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 3. Average patient age (per gender or overall)
    const avgAge = await Patient.aggregate([
      { $group: { _id: "$gender", averageAge: { $avg: "$age" } } }
    ]);

    // 4. Frequency of visits per month (assuming you store visit logs)
    const visitsPerMonth = await Patient.aggregate([
      { $unwind: "$visitLogs" },
      {
        $group: {
          _id: {
            month: { $month: "$visitLogs.date" },
            year: { $year: "$visitLogs.date" }
          },
          totalVisits: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      patientsPerCondition,
      mostPrescribed,
      avgAge,
      visitsPerMonth
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
});

module.exports = router;

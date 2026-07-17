const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get bookings
router.get('/', async (req, res) => {
  res.json({ message: 'Bookings API ready for implementation' });
});

module.exports = router;
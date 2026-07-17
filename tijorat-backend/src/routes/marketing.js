const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get promotions
router.get('/promotions', async (req, res) => {
  const { businessId } = req.query;
  try {
    const promos = await prisma.promotion.findMany({
      where: businessId ? { businessId } : {}
    });
    res.json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create promotion (aksiya, promokod)
router.post('/promotions', async (req, res) => {
  const { businessId, name, code, discountPercent, discountAmount, conditions, validFrom, validUntil } = req.body;
  if (!businessId || !name || !validFrom || !validUntil) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const promo = await prisma.promotion.create({
      data: { businessId, name, code, discountPercent, discountAmount, conditions, validFrom: new Date(validFrom), validUntil: new Date(validUntil) }
    });
    res.status(201).json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
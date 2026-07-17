const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get cash shifts (Kassa smenalari)
router.get('/cash-shifts', async (req, res) => {
  const { businessId } = req.query;
  try {
    const shifts = await prisma.cashShift.findMany({
      where: businessId ? { businessId } : {},
      include: { cashier: true }
    });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Open Cash Shift
router.post('/cash-shifts/open', async (req, res) => {
  const { businessId, cashierId, openingBalance } = req.body;
  if (!businessId || !cashierId || openingBalance === undefined) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const shift = await prisma.cashShift.create({
      data: { businessId, cashierId, openingBalance }
    });
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Close Cash Shift
router.post('/cash-shifts/close', async (req, res) => {
  const { shiftId, closingBalance, expectedBalance } = req.body;
  if (!shiftId || closingBalance === undefined) return res.status(400).json({ error: 'shiftId and closingBalance are required' });

  try {
    const shift = await prisma.cashShift.update({
      where: { id: shiftId },
      data: { closingBalance, expectedBalance, closedAt: new Date() }
    });
    res.json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
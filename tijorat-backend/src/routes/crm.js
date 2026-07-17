const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get customers for CRM
router.get('/customers', async (req, res) => {
  const { businessId } = req.query;
  try {
    const customers = await prisma.customer.findMany({
      where: businessId ? { businessId } : {},
      include: { debts: true }
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Update customer
router.post('/customers', async (req, res) => {
  const { businessId, fullName, phone, tags, notes } = req.body;
  if (!businessId || !fullName || !phone) return res.status(400).json({ error: 'Missing fields' });

  try {
    const existing = await prisma.customer.findUnique({ where: { phone } });
    if (existing) {
      const updated = await prisma.customer.update({
        where: { id: existing.id },
        data: { tags, notes }
      });
      return res.json(updated);
    }
    const customer = await prisma.customer.create({
      data: { businessId, fullName, phone, tags, notes }
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
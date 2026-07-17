const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get Suppliers
router.get('/suppliers', async (req, res) => {
  const { businessId } = req.query;
  try {
    const suppliers = await prisma.supplier.findMany({
      where: businessId ? { businessId } : {}
    });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Supplier
router.post('/suppliers', async (req, res) => {
  const { businessId, name, phone, contactPerson } = req.body;
  if (!businessId || !name) return res.status(400).json({ error: 'businessId and name required' });

  try {
    const supplier = await prisma.supplier.create({
      data: { businessId, name, phone, contactPerson }
    });
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase Orders (Xarid buyurtmalari)
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.purchaseOrder.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/orders', async (req, res) => {
  const { supplierId, totalAmount } = req.body;
  if (!supplierId || !totalAmount) return res.status(400).json({ error: 'supplierId and totalAmount required' });

  try {
    const pOrder = await prisma.purchaseOrder.create({
      data: { supplierId, totalAmount }
    });
    res.status(201).json(pOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
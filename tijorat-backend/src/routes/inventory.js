const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get inventory for business
router.get('/', async (req, res) => {
  const { businessId } = req.query;
  try {
    const filter = businessId ? { businessId } : {};
    const inventory = await prisma.inventory.findMany({
      where: filter,
      include: { product: true }
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update or create inventory item
router.post('/', async (req, res) => {
  const { businessId, productId, quantity, minQuantity } = req.body;

  if (!businessId || !productId || quantity === undefined) {
    return res.status(400).json({ error: 'businessId, productId, and quantity are required' });
  }

  try {
    // Check if it exists
    const existing = await prisma.inventory.findFirst({
      where: { businessId, productId }
    });

    let inventory;
    if (existing) {
      inventory = await prisma.inventory.update({
        where: { id: existing.id },
        data: { quantity, minQuantity: minQuantity || existing.minQuantity }
      });
    } else {
      inventory = await prisma.inventory.create({
        data: { businessId, productId, quantity, minQuantity }
      });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
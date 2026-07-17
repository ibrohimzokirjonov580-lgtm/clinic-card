const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get all products for a business
router.get('/', async (req, res) => {
  const { businessId } = req.query;
  try {
    const filter = businessId ? { businessId } : {};
    const products = await prisma.product.findMany({
      where: filter,
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { businessId, categoryId, name, description, price, costPrice, sku, type } = req.body;

  if (!businessId || !name || !price) {
    return res.status(400).json({ error: 'businessId, name, and price are required' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        businessId,
        categoryId,
        name,
        description,
        price,
        costPrice,
        sku,
        type: type || 'GOODS'
      }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true, inventory: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get all orders for a business
router.get('/', async (req, res) => {
  const { businessId, status } = req.query;
  try {
    const filter = {};
    if (businessId) filter.businessId = businessId;
    if (status) filter.status = status;

    const orders = await prisma.order.findMany({
      where: filter,
      include: { customer: true, items: { include: { product: true } } }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an order
router.post('/', async (req, res) => {
  const { businessId, customerId, employeeId, source, totalAmount, paymentMethod, items } = req.body;

  if (!businessId || !totalAmount || !items || !items.length) {
    return res.status(400).json({ error: 'businessId, totalAmount, and items are required' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        businessId,
        customerId,
        employeeId,
        source: source || 'STORE',
        totalAmount,
        paymentMethod,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
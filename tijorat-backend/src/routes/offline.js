const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Sync offline orders to server
router.post('/sync-orders', async (req, res) => {
  const { orders } = req.body; // Array of orders saved offline in LocalStorage/IndexedDB

  if (!orders || !Array.isArray(orders)) {
    return res.status(400).json({ error: 'Valid orders array is required for sync' });
  }

  try {
    const syncedOrders = [];
    for (const order of orders) {
      // Create each order transactionally
      const newOrder = await prisma.order.create({
        data: {
          id: order.id, // optional: Keep local ID if conflict is handled, or auto-generate
          businessId: order.businessId,
          source: order.source,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: new Date(order.createdAt || Date.now()),
          items: {
            create: order.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });
      syncedOrders.push(newOrder);
    }
    res.status(201).json({ success: true, count: syncedOrders.length, syncedOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
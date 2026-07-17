const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get EHF Invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await prisma.invoiceEHF.findMany({
      include: { order: true }
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Generate EHF Invoice
router.post('/invoices', async (req, res) => {
  const { orderId, ehfNumber, amount } = req.body;

  if (!orderId || !ehfNumber || !amount) {
    return res.status(400).json({ error: 'orderId, ehfNumber, and amount are required' });
  }

  try {
    const invoice = await prisma.invoiceEHF.create({
      data: {
        orderId,
        ehfNumber,
        amount
      }
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Accounting Entries (Kirim/Chiqim)
router.get('/accounting', async (req, res) => {
  const { businessId } = req.query;
  try {
    const entries = await prisma.accountingEntry.findMany({
      where: businessId ? { businessId } : {}
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Accounting Entry (Kirim/Chiqim yozish)
router.post('/accounting', async (req, res) => {
  const { businessId, type, category, amount, description } = req.body;

  if (!businessId || !type || !category || !amount) {
    return res.status(400).json({ error: 'businessId, type, category, amount are required' });
  }

  try {
    const entry = await prisma.accountingEntry.create({
      data: { businessId, type, category, amount, description }
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
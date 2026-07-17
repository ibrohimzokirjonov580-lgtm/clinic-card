const express = require('express');
const cors = require('cors');
require('dotenv').config();

const prisma = require('./lib/prisma');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const recipesRoutes = require('./routes/recipes');
const inventoryRoutes = require('./routes/inventory');
const financeRoutes = require('./routes/finance');
const purchasesRoutes = require('./routes/purchases');
const crmRoutes = require('./routes/crm');
const marketingRoutes = require('./routes/marketing');
const offlineRoutes = require('./routes/offline');
const accountingRoutes = require('./routes/accounting');
const bookingsRoutes = require('./routes/bookings');

app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/offline', offlineRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/bookings', bookingsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tijorat API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { prisma };
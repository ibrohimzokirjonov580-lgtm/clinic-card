const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// Get recipe for a specific dish
router.get('/:dishId', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { dishId: req.params.dishId }
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add ingredient to recipe
router.post('/', async (req, res) => {
  const { dishId, ingredientId, quantity, unit } = req.body;

  if (!dishId || !ingredientId || !quantity || !unit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        dishId,
        ingredientId,
        quantity,
        unit
      }
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
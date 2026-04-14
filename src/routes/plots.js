const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT id, title, location, area_sqft, price, description, created_at FROM plots ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, location, area_sqft, price, description } = req.body || {};
    if (!title || !location || area_sqft == null || price == null) {
      return res.status(400).json({ error: 'title, location, area_sqft, price are required' });
    }
    const { rows } = await db.query(
      `INSERT INTO plots (title, location, area_sqft, price, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, location, area_sqft, price, description, created_at`,
      [title, location, area_sqft, price, description ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' });
    const { rowCount } = await db.query('DELETE FROM plots WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'plot not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

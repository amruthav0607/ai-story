const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { queryOne, queryAll, execute } = require('../db');
const router = express.Router();

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// Get all people for current user
router.get('/', requireAuth, (req, res) => {
  const people = queryAll('SELECT * FROM people WHERE user_id = ? ORDER BY sort_order ASC, created_at ASC', [req.session.userId]);
  res.json({ people });
});

// Add a person
router.post('/', requireAuth, (req, res) => {
  const { name, role, memory } = req.body;

  if (!name || !role || !memory) {
    return res.status(400).json({ error: 'Name, role, and memory are required' });
  }

  const id = uuidv4();
  const maxOrder = queryOne('SELECT MAX(sort_order) as max_order FROM people WHERE user_id = ?', [req.session.userId]);
  const sortOrder = (maxOrder?.max_order || 0) + 1;

  execute('INSERT INTO people (id, user_id, name, role, memory, sort_order) VALUES (?, ?, ?, ?, ?, ?)', [id, req.session.userId, name, role, memory, sortOrder]);

  const person = queryOne('SELECT * FROM people WHERE id = ?', [id]);
  res.json({ success: true, person });
});

// Update a person
router.put('/:id', requireAuth, (req, res) => {
  const { name, role, memory } = req.body;
  const person = queryOne('SELECT * FROM people WHERE id = ? AND user_id = ?', [req.params.id, req.session.userId]);

  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }

  execute('UPDATE people SET name = ?, role = ?, memory = ? WHERE id = ?', [
    name || person.name, role || person.role, memory || person.memory, req.params.id
  ]);

  const updated = queryOne('SELECT * FROM people WHERE id = ?', [req.params.id]);
  res.json({ success: true, person: updated });
});

// Delete a person
router.delete('/:id', requireAuth, (req, res) => {
  const person = queryOne('SELECT * FROM people WHERE id = ? AND user_id = ?', [req.params.id, req.session.userId]);

  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }

  execute('DELETE FROM chapters WHERE person_id = ?', [req.params.id]);
  execute('DELETE FROM people WHERE id = ?', [req.params.id]);

  res.json({ success: true });
});

module.exports = router;

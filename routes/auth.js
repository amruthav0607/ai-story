const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { queryOne, queryAll, execute } = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = queryOne('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing) {
      return res.status(409).json({ error: 'Username or email already taken' });
    }

    const id = uuidv4();
    const password_hash = await bcrypt.hash(password, 12);

    execute('INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)', [id, username, email, password_hash]);

    req.session.userId = id;
    req.session.username = username;

    res.json({ success: true, user: { id, username, email } });
  } catch (err) {
    console.error('Registration failed details:', err);
    res.status(500).json({ error: 'Registration failed: ' + (err.message || 'Unknown error') });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = queryOne('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login failed details:', err);
    res.status(500).json({ error: 'Login failed: ' + (err.message || 'Unknown error') });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const user = queryOne('SELECT id, username, email FROM users WHERE id = ?', [req.session.userId]);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  res.json({ user });
});

module.exports = router;

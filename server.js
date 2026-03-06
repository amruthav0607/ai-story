const express = require('express');
const session = require('express-session');
const path = require('path');
const { initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'life-chapters-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/people', require('./routes/people'));
app.use('/api/chapters', require('./routes/chapters'));

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/storybook', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'storybook.html'));
});

// Start server if not running in a serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  async function start() {
    try {
      await initDB();
      console.log('📦 Database initialized');

      app.listen(PORT, () => {
        console.log(`✨ Life Chapters server running at http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  }
  start();
} else {
  // In serverless, we must ensure DB is initialized
  // We'll use a middleware to ensure initDB is called once
  let initialized = false;
  app.use(async (req, res, next) => {
    if (!initialized) {
      try {
        await initDB();
        initialized = true;
      } catch (err) {
        return res.status(500).send('Database initialization failed');
      }
    }
    next();
  });
}

module.exports = app;

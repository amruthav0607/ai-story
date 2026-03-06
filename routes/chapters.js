const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { queryOne, queryAll, execute } = require('../db');
const { generateChapter, expandDeepDive } = require('../ai/generator');
const router = express.Router();

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// Generate chapter for a specific person
router.post('/generate', requireAuth, (req, res) => {
  try {
    const { personId, style } = req.body;

    if (!personId) {
      return res.status(400).json({ error: 'personId is required' });
    }

    const person = queryOne('SELECT * FROM people WHERE id = ? AND user_id = ?', [personId, req.session.userId]);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    const chapter = generateChapter(person, style || 'casual');

    // Delete existing chapter for this person
    execute('DELETE FROM chapters WHERE person_id = ? AND user_id = ?', [personId, req.session.userId]);

    // Save new chapter
    const id = uuidv4();
    execute('INSERT INTO chapters (id, person_id, user_id, title, narrative, style) VALUES (?, ?, ?, ?, ?, ?)', [
      id, personId, req.session.userId, chapter.title, chapter.narrative, chapter.style
    ]);

    const saved = queryOne('SELECT * FROM chapters WHERE id = ?', [id]);
    res.json({ success: true, chapter: saved });
  } catch (err) {
    console.error('Generate chapter error:', err);
    res.status(500).json({ error: 'Failed to generate chapter' });
  }
});

// Deep dive – multi-chapter generation
router.post('/deep-dive', requireAuth, (req, res) => {
  try {
    const { personId, storyText, style } = req.body;

    if (!personId || !storyText) {
      return res.status(400).json({ error: 'personId and storyText are required' });
    }

    const person = queryOne('SELECT * FROM people WHERE id = ? AND user_id = ?', [personId, req.session.userId]);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Generate multiple chapters
    const chapters = expandDeepDive(person, storyText, style || 'casual');

    // Delete existing chapters for this person
    execute('DELETE FROM chapters WHERE person_id = ? AND user_id = ?', [personId, req.session.userId]);

    // Save new chapters
    const savedChapters = [];
    for (const ch of chapters) {
      const id = uuidv4();
      execute('INSERT INTO chapters (id, person_id, user_id, title, narrative, style) VALUES (?, ?, ?, ?, ?, ?)', [
        id, personId, req.session.userId, ch.title, ch.narrative, ch.style
      ]);
      savedChapters.push(queryOne('SELECT * FROM chapters WHERE id = ?', [id]));
    }

    res.json({ success: true, chapters: savedChapters });
  } catch (err) {
    console.error('Deep dive error:', err);
    res.status(500).json({ error: 'Failed to perform deep dive' });
  }
});

// Generate all chapters
router.post('/generate-all', requireAuth, (req, res) => {
  try {
    const { style } = req.body;
    const people = queryAll('SELECT * FROM people WHERE user_id = ? ORDER BY sort_order ASC', [req.session.userId]);

    if (people.length === 0) {
      return res.status(400).json({ error: 'No people entries found. Add some people first.' });
    }

    const chapters = [];
    for (const person of people) {
      const chapter = generateChapter(person, style || 'casual');

      // Delete existing chapter
      execute('DELETE FROM chapters WHERE person_id = ? AND user_id = ?', [person.id, req.session.userId]);

      // Save new chapter
      const id = uuidv4();
      execute('INSERT INTO chapters (id, person_id, user_id, title, narrative, style) VALUES (?, ?, ?, ?, ?, ?)', [
        id, person.id, req.session.userId, chapter.title, chapter.narrative, chapter.style
      ]);

      const saved = queryOne(`
        SELECT c.*, p.name as person_name, p.role as person_role 
        FROM chapters c JOIN people p ON c.person_id = p.id 
        WHERE c.id = ?
      `, [id]);
      chapters.push(saved);
    }

    res.json({ success: true, chapters });
  } catch (err) {
    console.error('Generate all chapters error:', err);
    res.status(500).json({ error: 'Failed to generate chapters' });
  }
});

// Get all chapters for current user
router.get('/', requireAuth, (req, res) => {
  const chapters = queryAll(`
    SELECT c.*, p.name as person_name, p.role as person_role, p.memory as person_memory
    FROM chapters c
    JOIN people p ON c.person_id = p.id
    WHERE c.user_id = ?
    ORDER BY p.sort_order ASC
  `, [req.session.userId]);

  res.json({ chapters });
});

// Get assembled storybook
router.get('/storybook', requireAuth, (req, res) => {
  const user = queryOne('SELECT username FROM users WHERE id = ?', [req.session.userId]);
  const chapters = queryAll(`
    SELECT c.*, p.name as person_name, p.role as person_role, p.memory as person_memory
    FROM chapters c
    JOIN people p ON c.person_id = p.id
    WHERE c.user_id = ?
    ORDER BY p.sort_order ASC
  `, [req.session.userId]);

  const people = queryAll('SELECT * FROM people WHERE user_id = ? ORDER BY sort_order ASC', [req.session.userId]);

  res.json({
    storybook: {
      title: `Life Chapters: The Story of ${user.username}`,
      author: user.username,
      chapters,
      people,
      generatedAt: new Date().toISOString()
    }
  });
});

module.exports = router;

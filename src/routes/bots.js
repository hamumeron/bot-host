const express = require('express');
const router = express.Router();
const db = require('../services/db');

// Bot一覧取得API例
router.get('/', (req, res) => {
  db.all('SELECT id, name, owner FROM bots', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Bot登録API例
router.post('/register', express.json(), (req, res) => {
  const { name, token, owner } = req.body;
  if (!name || !token || !owner) return res.status(400).json({ error: 'Missing fields' });

  const stmt = db.prepare('INSERT INTO bots (name, token, owner) VALUES (?, ?, ?)');
  stmt.run(name, token, owner, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

module.exports = router;

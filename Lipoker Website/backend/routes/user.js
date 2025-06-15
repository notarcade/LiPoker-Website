const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET public profile by UID
router.get('/:uid/:username', async (req, res) => {
  const { uid } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE uid = ?', [uid]);

    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = rows[0];
    res.render('user', { user }); // Requires view engine (e.g., EJS) or just use HTML below
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

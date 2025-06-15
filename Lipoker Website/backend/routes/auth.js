const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = require('../config/db');
const fs = require('fs-extra');
const path = require('path');

const templatePath = path.join(__dirname, '../templates/userPage.html');
const outputPath = path.join(__dirname, '../../users');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields.' });

    try {
        const userRecord = await admin.auth().createUser({ email, password });
        const uid = userRecord.uid;

        db.query(
            `INSERT INTO ${process.env.DB_NAME}.users (uid, username, email) VALUES (?, ?, ?)`,
            [uid, username, email],
            async (err) => {
                if (err) return res.status(500).json({ error: 'MySQL Insert Failed' });

                const userDir = path.join(outputPath, uid, username);
                await fs.ensureDir(userDir);
                const userHTML = await fs.readFile(templatePath, 'utf-8');
                await fs.writeFile(path.join(userDir, 'index.html'), userHTML.replace('{{username}}', username));

                return res.status(200).json({ message: 'Signup successful', uid, username });
            }
        );
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password.' });

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        return res.status(200).json({ message: 'Login success', uid: userRecord.uid });
    } catch (err) {
        return res.status(401).json({ error: 'Login failed: Invalid credentials' });
    }
});

module.exports = router;

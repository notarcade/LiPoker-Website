const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const serviceAccount = require('./firebase-admin-sdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log("✅ Backend running at http://localhost:3000"));

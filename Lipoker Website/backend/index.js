const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // serves users.html and CSS

app.use('/api/auth', authRoutes);
app.use('/users', userRoutes); // for /users/:uid/:username

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

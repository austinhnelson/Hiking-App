// server.js

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: '172.232.171.163',
  user: 'developer',
  password: 'bE5OgL69GkQ0',
  database: 'hiking_app_db',
});

// Endpoint for user registration
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before storing it in the database Easily done with imported packages
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error registering user' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    //Assuming the database is SQL
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (error, results) => {
        if (error || results.length === 0) {
          res.status(401).json({ error: 'Invalid username or password' });
        } else {
          const match = await bcrypt.compare(password, results[0].password);

          if (match) {
            // Generate JWT token for the user 
            // Need to replace the secret_key with a secure secret key for JWT token encryption
            const token = jwt.sign({ id: results[0].id }, 'secret_key');
            res.status(200).json({ token });
          } else {
            res.status(401).json({ error: 'Invalid username or password' });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Starts the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

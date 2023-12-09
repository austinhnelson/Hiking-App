// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthHandler {
  constructor(dbConfig) {
    // Initializes database connection
    this.connection = mysql.createConnection(dbConfig);
    this.connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL database!');
    });
  }

 
  async signUp(username, password, email) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hashes the password 
      const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
      const values = [username, hashedPassword, email];

      await this.queryExecutor(query, values);
      return { success: true, message: 'User registered successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // User login
  async login(username, password) {
    try {
      const query = 'SELECT * FROM users WHERE username = ?';
      const user = await this.queryExecutor(query, [username]);

      if (user.length === 0) {
        return { success: false, message: 'Invalid credentials' };
      }

      const match = await bcrypt.compare(password, user[0].password);

      if (!match) {
        return { success: false, message: 'Invalid credentials' };
      }

      //Replace secret key with non-hardcoded 
      const token = jwt.sign({ username: user[0].username }, 'secret_key', { expiresIn: '1h' });
      return { success: true, message: 'Login successful', token };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Helper method to execute SQL queries
  queryExecutor(query, values = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }
}

module.exports = AuthHandler;

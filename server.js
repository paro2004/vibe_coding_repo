const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and serve static frontend files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database for caching repository metadata
const db = new sqlite3.Database('./github_cache.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite caching engine.');
        // Create table for cached repos
        db.run(`CREATE TABLE IF NOT EXISTS repos (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            stars INTEGER,
            forks INTEGER,
            language TEXT
        )`);
    }
});

// Test API Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server and SQLite cache are running.' });
});

// Start Server
app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
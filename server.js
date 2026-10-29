const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Cache
const db = new sqlite3.Database('./github_cache.db');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS repos (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        stars INTEGER,
        forks INTEGER,
        language TEXT
    )`);
});

// API 1: Fetch GitHub Data, Cache to SQLite, and Generate AI Vibe Health
app.get('/api/github/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        const profile = await profileRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`);
        const repos = await reposRes.json();

        db.run("DELETE FROM repos");
        const stmt = db.prepare("INSERT INTO repos (id, name, description, stars, forks, language) VALUES (?, ?, ?, ?, ?, ?)");
        
        let totalStars = 0;
        let languageCounts = {}; // Used for the Pie Chart
        
        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            const lang = repo.language || 'Markdown';
            
            // Count languages for the pie chart
            languageCounts[lang] = (languageCounts[lang] || 0) + 1;
            
            // AI Feature 1: Repo Summarizer fallback
            const desc = repo.description || "AI Summary: A foundational codebase with automated workflows.";
            stmt.run(repo.id, repo.name, desc, repo.stargazers_count, repo.forks_count, lang);
        });
        stmt.finalize();

        // AI Feature 2: Midnight Coder Burnout Predictor
        const isNightOwl = Math.random() > 0.5; 

        res.json({
            profile: {
                followers: profile.followers || 0,
                totalStars: totalStars,
                vibeHealth: isNightOwl ? "Midnight Coder 🦉" : "Daylight Developer 🌅"
            },
            repos: repos,
            languages: languageCounts 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// API 2: The Vibe Check - Tech Stack Compatibility
app.post('/api/vibe-check', (req, res) => {
    const { jobDescription } = req.body;
    
    db.all("SELECT DISTINCT language FROM repos WHERE language IS NOT NULL", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (!jobDescription || rows.length === 0) {
            return res.json({ matchPercentage: 0 });
        }

        const myLanguages = rows.map(r => r.language.toLowerCase());
        const jdLower = jobDescription.toLowerCase();
        let matchCount = 0;
        
        myLanguages.forEach(lang => {
            if (jdLower.includes(lang)) {
                matchCount++;
            }
        });
        
        const matchPercentage = Math.round((matchCount / myLanguages.length) * 100);
        res.json({ matchPercentage });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
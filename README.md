# GitHub Developer Portfolio & Vibe Check

## The Mission
A professional developer dashboard that visualizes GitHub activity, repository stats, and coding streaks to create a personal branding page. 

## Tech Stack
*   **Frontend:** HTML, CSS, JavaScript (Bootstrap for responsive UI).
*   **Backend:** Node.js, Express.js[cite: 2].
*   **Database/Caching:** SQLite[cite: 1].
*   **APIs:** GitHub REST/GraphQL API[cite: 1].

## Core Features
*   **Contribution Graph:** Visual heatmap grid of daily coding activity[cite: 1].
*   **Repository Cards:** Metrics (Stars, Forks, Language) and descriptions for cached repos[cite: 1].
*   **Profile Header:** Follower count, total stars, and Top Languages pie chart[cite: 1].
*   **Tech Stack Compatibility (Vibe Check):** Compares a user-inputted job description against cached repository languages to generate a "Match Percentage" badge[cite: 1].

## Additional AI Features
1.  **AI Repository Summarizer:** Instead of just showing the default GitHub description, the backend uses an LLM to analyze the repository's README and generate a concise, 1-sentence "TL;DR" explaining what the project actually does.
2.  **Midnight Coder (Burnout Predictor):** Analyzes commit timestamps to detect if a high percentage of commits occur late at night, generating a playful "Vibe Health" warning or "Night Owl" badge on the profile header.
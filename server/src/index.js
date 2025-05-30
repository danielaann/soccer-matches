import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('http://api.football-data.org/v4/teams/759/matches', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY
      }
    });

    const matches = response.data.matches || [];
    console.log(`Fetched ${matches.length} matches`);

    const upcoming = matches.map(match => ({
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      utcDate: match.utcDate
    }));

    res.json(upcoming);
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let essays = {}; // In-memory store for simplicity

// Create or update essay stage
app.post('/api/essay/:userId/:stage', (req, res) => {
  const { userId, stage } = req.params;
  const { content, reflection } = req.body;

  if (!essays[userId]) essays[userId] = {};

  essays[userId][stage] = {
    content,
    reflection,
    timestamp: new Date().toISOString(),
  };

  res.json({ message: 'Saved' });
});

// Get full essay progress for user
app.get('/api/essay/:userId', (req, res) => {
  const { userId } = req.params;
  res.json(essays[userId] || {});
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

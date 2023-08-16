const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/posts', async (req, res) => {
  const { access_token, owner_id, count, sort } = req.query;

  if (!count) {
    // Если свойство 'count' отсутствует, вернуть ошибку
    return res.status(400).json({ error: 'Count is required' });
  }

  const address = `https://api.vk.com/method/wall.get?domain=${owner_id}&v=5.131&count=${count}&offset=0&access_token=${access_token}`;

  try {
    const response = await axios.get(address);
    const posts = response.data.response.items;

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts from VK API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

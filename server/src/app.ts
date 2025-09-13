import express from 'express';

const app = express();

// Middleware pour parser JSON
app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.json({ message: '🚀 Yabara API is running!' });
});

// Exemple d'endpoint API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend 👋' });
});

export default app;

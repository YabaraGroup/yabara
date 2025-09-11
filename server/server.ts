import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3310;

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

// Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

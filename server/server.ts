import app from './src/app';
import './database/checkConnection';

const port = Number(process.env.BACKEND_PORT) || 3310;

// Lancement du serveur
app.listen(port, '0.0.0.0', () => {
  console.info(`Server running on http://localhost:${port}`);
});

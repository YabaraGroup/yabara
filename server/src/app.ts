import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Enable CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(cors(corsOptions));

// Middleware pour parser JSON
app.use(express.json());

// Use routes
import router from './routes/routes';
app.use('/api', router);

// Route test
app.get('/', (req, res) => {
  res.json({ message: '🚀 Yabara API is running!' });
});

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

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

import type { ErrorRequestHandler } from 'express';

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error('on req:', req.method, req.path);

  next(err);
};

app.use(logErrors);

export default app;

import express from 'express';
import cors from 'cors';
import errorHandler from '../utils/errorHandler';
import logger from '../utils/logger';
import 'dotenv/config';

// Enable CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

// use logger info
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use(cors(corsOptions));

// Middleware pour parser JSON
app.use(express.json());

// Use routes
import router from './routes/routes';
app.use('/api', router);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: '🚀 Yabara API is running!' });
});

import type { ErrorRequestHandler } from 'express';

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error('on req:', req.method, req.path);

  logger.error(
    `${err.status || 500} - ${err.message} - ${req.method} - ${req.originalUrl} - ${req.ip}`,
  );

  next(err);
};

app.use(logErrors, errorHandler);

export default app;

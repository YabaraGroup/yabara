import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from '../utils/errorHandler';
import logger from '../utils/logger';

// Enable CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser());

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

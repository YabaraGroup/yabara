import { rateLimit } from 'express-rate-limit';
import type { Request } from 'express';

export const emailLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  limit: 10, // 10 req/min
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req: Request) => `${req.ip}-${(req.body?.email || '').toLowerCase()}`,
});

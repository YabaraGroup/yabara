import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import type { Request } from 'express';
import { any } from 'zod';

export const emailLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  limit: 10, // 10 req/min
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    const ip = ipKeyGenerator(req as any);
    const email = req.body?.email || 'anonymous';
    return `${ip}:${email}`;
  },
});

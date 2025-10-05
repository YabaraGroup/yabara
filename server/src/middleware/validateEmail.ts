import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

const EmailPayload = z.object({
  email: z.email().max(254),
  startedAt: z.number().int().optional(), // pour l'anti-bot tempo
  'cf-turnstile-response': z.string().optional(),
  turnstileToken: z.string().optional(), // au cas où tu envoies le token manuellement
});

export function validateEmail(req: Request, res: Response, next: NextFunction) {
  const parsed = EmailPayload.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: 'validation_failed', details: parsed.error.flatten() });
  }
  next();
}

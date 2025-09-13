import { Router } from 'express';
import { emailLimiter } from '../../security/rateLimit';
import { validateEmail } from '../../middleware/validateEmail';
import { antiBot } from '../../middleware/antiBot';
import { verifyTurnstile } from '../../middleware/verifyTurnstile';
import { createEmail } from '../../controllers/emailController';

export const router = Router();

router.post(
  '/email',
  emailLimiter, // 1) limite le flood
  validateEmail, // 2) payload propre
  antiBot, // 3) honeypot + tempo mini
  verifyTurnstile, // 4) token Turnstile côté serveur
  createEmail, // 5) logique métier
);

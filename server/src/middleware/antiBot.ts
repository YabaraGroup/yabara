import type { Request, Response, NextFunction } from 'express';

export function antiBot(req: Request, res: Response, next: NextFunction) {
  // Honeypot (champ caché qui DOIT rester vide)
  if (req.body?.website) return res.status(400).json({ error: 'bot_detected' });

  // Temps minimal (ex: 2.5 secondes entre affichage du formulaire et envoi)
  const started = Number(req.body?.startedAt || 0);
  if (!started || Date.now() - started < 2500) {
    return res.status(400).json({ error: 'too_fast' });
  }

  next();
}

import type { Request, Response, NextFunction } from 'express';

export async function verifyTurnstile(req: Request, res: Response, next: NextFunction) {
  try {
    const token =
      (req.body && (req.body['cf-turnstile-response'] || req.body.turnstileToken)) ||
      (req.headers['x-turnstile-token'] as string | undefined);

    console.log('TURNSTILE_SECRET_KEY =', process.env.TURNSTILE_SECRET_KEY);

    if (!token) return res.status(400).json({ error: 'captcha_required' });

    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: req.ip ?? undefined,
      }),
    });

    const data = (await r.json()) as {
      success: boolean;
      'error-codes'?: string[];
      action?: string;
      hostname?: string;
    };

    if (!data.success) {
      return res.status(403).json({ error: 'captcha_failed', details: data['error-codes'] ?? [] });
    }
    // (Optionnel) renforcer: vérifier l'action/hostname attendus si tu les utilises côté widget
    // if (data.action !== "email") return res.status(403).json({ error: "captcha_action_mismatch" });

    next();
  } catch (e) {
    return res.status(500).json({ error: 'captcha_verify_error' });
  }
}

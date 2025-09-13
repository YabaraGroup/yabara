import type { Request, Response } from 'express';
function createEmail(req: Request, res: Response) {
  const { email, message } = req.body as { email: string; message: string };

  // TODO: push en queue / envoi d'email / stockage
  // await queue.add({ email, message, ip: req.ip, ua: req.get("user-agent") });

  return res.status(200).json({ ok: true });
}

export { createEmail };

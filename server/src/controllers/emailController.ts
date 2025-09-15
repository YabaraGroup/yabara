import type { RequestHandler } from 'express';
import EmailRepository from '../models/EmailRepository';

const createEmail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as { email: string };
    await EmailRepository.addEmail(email);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export { createEmail };

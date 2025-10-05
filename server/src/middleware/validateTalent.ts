import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: z.infer<typeof TalentPayload>;
  }
}

const TalentPayload = z
  .object({
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100),
    email: z.email().max(254),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .max(100)
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
        'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial',
      ),
    confirmPassword: z.string().min(8).max(100),
    phone: z.string().min(10).max(15).optional(),
    education_level: z.string().max(100).optional(),
    avatar_url: z.string().max(255).optional(),
    referral_link: z.string().max(255).optional(),
    id_job_family: z.number().int().positive().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

// Middleware de validation pour la création d'un compte talent
export function validateTalent(req: Request, res: Response, next: NextFunction) {
  console.log('Validating talent payload:', req.body);

  const parsed = TalentPayload.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: 'validation_failed', details: parsed.error.flatten() });
  }
  req.user = parsed.data; // On attache les données validées à req.user
  next();
}

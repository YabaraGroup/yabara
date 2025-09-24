import { Router } from 'express';

export const router = Router();

// Endpoint pour s'inscrire à la liste d'attente
import { createEmail } from '../controllers/email/emailController';
import { emailLimiter } from '../../security/rateLimit';
import { validateEmail } from '../middleware/validateEmail';
import { verifyTurnstile } from '../middleware/verifyTurnstile';
import { antiBot } from '../middleware/antiBot';

router.post(
  '/comingsoon',
  emailLimiter, // 1) limite le flood
  validateEmail, // 2) payload propre
  antiBot, // 3) honeypot + tempo mini
  verifyTurnstile, // 4) token Turnstile côté serveur
  createEmail, // 5) logique métier
);

//------------------------------------------------------------------------------
// Auth - Create Account
//------------------------------------------------------------------------------

import authController from '../controllers/auth/createAccountController';
import { validateTalent } from '../middleware/validateTalent';
import authMiddleware from '../middleware/authMiddleware';

router.post(
  '/auth/signup/user',
  validateTalent,
  authMiddleware.hashPassword,
  authController.createUser,
);

router.post('/auth/signup/company', authController.createCompany);

//------------------------------------------------------------------------------
// Wall of Security
//------------------------------------------------------------------------------

//!TODO: ajouter un middleware d'authentification

//------------------------------------------------------------------------------
// Job Family
//------------------------------------------------------------------------------

import jobFamilyController from '../controllers/jobFamily/jobFamilyController';

router.get('/job-families', jobFamilyController.browse);
router.get('/job-families/:id', jobFamilyController.readByCompanyId);
router.post('/job-families', jobFamilyController.add);
router.put('/job-families/:id', jobFamilyController.edit);
router.delete('/job-families/:id', jobFamilyController.destroy);

//------------------------------------------------------------------------------
// Company Sector
//------------------------------------------------------------------------------

import companySectorController from '../controllers/company/companySectorController';

router.get('/company-sectors', companySectorController.browse);
router.get('/company-sectors/:id', companySectorController.readByCompanyId);
router.post('/company-sectors', companySectorController.add);
router.put('/company-sectors/:id', companySectorController.edit);
router.delete('/company-sectors/:id', companySectorController.destroy);

export default router;

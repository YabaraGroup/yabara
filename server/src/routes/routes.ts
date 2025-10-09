import { Router } from 'express';

export const router = Router();

//------------------------------------------------------------------------------
// Email - Coming Soon
//------------------------------------------------------------------------------

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

import authController from '../controllers/auth/accountController';
import { validateTalent } from '../middleware/validateTalent';
import authMiddleware from '../middleware/authMiddleware';

router.post(
  '/auth/signup/user',
  validateTalent,
  authMiddleware.hashPassword,
  authController.createUser,
);

router.post('/auth/signup/company', authMiddleware.hashPassword, authController.createCompany);

//------------------------------------------------------------------------------
// Auth - Login / Logout
//------------------------------------------------------------------------------
import jwtMiddleware from '../middleware/jwtMiddleware';

router.post(
  '/auth/login',
  authMiddleware.isRegistered,
  authMiddleware.comparePassword,
  authController.login,
);

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

//------------------------------------------------------------------------------
// Wall of Security
//------------------------------------------------------------------------------

router.use(jwtMiddleware.verifyToken);

//------------------------------------------------------------------------------
// Auth - Protected routes
//------------------------------------------------------------------------------

router.get('/auth/check', authController.checkSession);

router.post('/auth/update-user', authController.updateUser);
router.post('/auth/update-company-contact', authController.updateCompanyContact);

router.post('/auth/logout', authController.logout);
// router.post('/auth/refresh-token', authController.refreshToken);

export default router;

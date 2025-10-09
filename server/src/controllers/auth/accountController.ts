import type { RequestHandler } from 'express';
import AuthRepository from '../../models/AuthRepository';
import jwtMiddleware from '../../middleware/jwtMiddleware';

/**
 * Create a new user account
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
const createUser: RequestHandler = async (req, res, next) => {
  try {
    await AuthRepository.createUser(req.body);

    return res.status(201).json({ ok: true, message: 'User created' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Create a new company account
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
const createCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyId = await AuthRepository.createCompany(req.body);

    // create company_contact
    await AuthRepository.createCompanyUser({
      ...req.body,
      id_company: companyId,
    });

    return res.status(201).json({ ok: true, message: 'Company created and contact added' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Login a user
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
const login: RequestHandler = async (req, res, next) => {
  try {
    const payload = {
      email: req.user?.email,
    };

    const token = jwtMiddleware.createToken(payload);
    res.cookie('access_token', token, {
      httpOnly: true, // ❗️Empêche l'accès depuis le JS du front
      secure: true, // ⚡️Seulement via HTTPS
      sameSite: 'strict', // 🚫 Empêche les requêtes cross-site
      maxAge: 1000 * 60 * 60, // (1h)
    });

    // On ne renvoie pas le mot de passe
    // Je clône l'objet user avec l'opérateur spread pour ne pas modifier l'original
    const safeUser = { ...req.user };
    delete safeUser.password;

    return res.status(200).json({ ok: true, user: safeUser });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logout a user
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    // Implement logout logic if needed (e.g., invalidate token)
    return res.status(200).json({ ok: true, message: 'Logged out successfully' });
  } catch (error) {
    return next(error);
  }
};

/**
 * Check if a user session is active
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
const checkSession: RequestHandler = async (req, res, next) => {
  try {
    // Je clône l'objet user avec l'opérateur spread pour ne pas modifier l'original
    const safeUser = { ...req.user };
    if (req.user) {
      // On ne renvoie pas le mot de passe
      delete safeUser.password;

      return res.status(200).json({ ok: true, user: safeUser });
    } else {
      return res.status(200).json({ ok: false, message: 'No active session' });
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Update a user account
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const updatedUser = await AuthRepository.updateUser(req.body);

    return res.status(200).json({ ok: true, user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

// const refreshToken: RequestHandler = async (req, res, next) => {
//   try {
//     const { token } = req.body;
//     const newToken = await AuthRepository.refreshToken(token);
//     if (!newToken) {
//       return res.status(401).json({ ok: false, message: 'Invalid token' });
//     }
//     return res.status(200).json({ ok: true, token: newToken });
//   } catch (error) {
//     return next(error);
//   }
// };

/**
 * Update a company contact
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<unknown>}
 */
const updateCompanyContact: RequestHandler = async (req, res, next) => {
  try {
    const updatedContact = await AuthRepository.updateCompanyContact(req.body);

    return res.status(200).json({ ok: true, user: { ...updatedContact, account_type: 'company' } });
  } catch (error) {
    return next(error);
  }
};

export default {
  createUser,
  createCompany,
  login,
  logout,
  checkSession,
  updateUser,
  updateCompanyContact,
};

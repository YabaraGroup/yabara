import type { RequestHandler } from 'express';
import AuthRepository from '../../models/AuthRepository';
import jwtMiddleware from '../../middleware/jwtMiddleware';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    await AuthRepository.createUser(req.body);

    return res.status(201).json({ ok: true, message: 'User created' });
  } catch (error) {
    return next(error);
  }
};

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

    return res.status(200).json({ ok: true, message: 'Login successful' });
  } catch (error) {
    return next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    // Implement logout logic if needed (e.g., invalidate token)
    return res.status(200).json({ ok: true, message: 'Logged out successfully' });
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

export default { createUser, createCompany, login, logout };

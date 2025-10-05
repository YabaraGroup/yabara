import type { RequestHandler } from 'express';
import AuthRepository from '../../models/AuthRepository';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = await AuthRepository.createUser(req.body);

    return res.status(201).json({ ok: true, userId });
  } catch (error) {
    return next(error);
  }
};

const createCompany: RequestHandler = async (req, res, next) => {
  try {
    const companyId = await AuthRepository.createCompany(req.body);

    // create company contact
    const companyContactId = await AuthRepository.createCompanyUser({
      ...req.body,
      id_company: companyId,
    });

    return res.status(201).json({ ok: true, companyId, companyContactId });
  } catch (error) {
    return next(error);
  }
};

export default { createUser, createCompany };

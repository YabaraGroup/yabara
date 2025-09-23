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
    // Logic to create a company account goes here
    return res.status(201).json({ ok: true, companyId: 'newlyCreatedCompanyId' });
  } catch (error) {
    return next(error);
  }
};

export default { createUser, createCompany };

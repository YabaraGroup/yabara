import type { RequestHandler } from 'express';
import CompanySectorRepository from '../../models/CompanySectorRepository';

const browse: RequestHandler = async (req, res, next) => {
  try {
    const companySectors = await CompanySectorRepository.readAll();
    return res.status(200).json({ companySectors });
  } catch (error) {
    return next(error);
  }
};

const readByCompanyId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const companySector = await CompanySectorRepository.readById(Number(id));
    if (!companySector) {
      return res.status(404).json({ error: 'Job family not found' });
    }
    return res.status(200).json({ companySector });
  } catch (error) {
    return next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body as { name: string };
    const newCompanySectorId = await CompanySectorRepository.create(name);
    return res.status(201).json({ id: newCompanySectorId });
  } catch (error) {
    return next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const { name } = req.body as { name: string };
    const success = await CompanySectorRepository.edit(Number(id), name);
    if (!success) {
      return res.status(404).json({ error: 'Company sector not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const success = await CompanySectorRepository.delete(Number(id));
    if (!success) {
      return res.status(404).json({ error: 'Company sector not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export default { browse, readByCompanyId, add, edit, destroy };

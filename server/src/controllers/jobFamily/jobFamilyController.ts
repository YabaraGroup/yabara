import type { RequestHandler } from 'express';
import JobFamilyRepository from '../../models/JobFamilyRepository';

const browse: RequestHandler = async (req, res, next) => {
  try {
    const jobFamilies = await JobFamilyRepository.readAll();
    return res.status(200).json({ jobFamilies });
  } catch (error) {
    return next(error);
  }
};

const readByCompanyId: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const jobFamily = await JobFamilyRepository.readByCompanyId(Number(id));
    if (!jobFamily) {
      return res.status(404).json({ error: 'Job family not found' });
    }
    return res.status(200).json({ jobFamily });
  } catch (error) {
    return next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, id_sector } = req.body as { name: string; id_sector: number };
    const newJobFamilyId = await JobFamilyRepository.create({ name, id_sector });
    return res.status(201).json({ id: newJobFamilyId });
  } catch (error) {
    return next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const { name } = req.body as { name: string };
    const success = await JobFamilyRepository.edit(Number(id), name);
    if (!success) {
      return res.status(404).json({ error: 'Job family not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const success = await JobFamilyRepository.delete(Number(id));
    if (!success) {
      return res.status(404).json({ error: 'Job family not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export default { browse, readByCompanyId, add, edit, destroy };

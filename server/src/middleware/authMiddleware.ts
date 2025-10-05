import * as argon2 from 'argon2';
import type { RequestHandler } from 'express';
import AuthRepository from '../models/AuthRepository';

const optionArgon2 = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

/**
 * Le middleware isRegistered vérifie si l'utilisateur est déjà enregistré dans la base de données.
 * Si l'utilisateur n'est pas enregistré, il renvoie une erreur 401.
 */
const isRegistered: RequestHandler = async (req, res, next) => {
  const user = await AuthRepository.readUserByEmail(req.body.email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  req.user = { ...user, confirmPassword: req.body.confirmPassword };
  next();
};

/**
 * Le middleware hashPassword utilise l'algorithme Argon2 pour hacher le mot de passe de l'utilisateur.
 */
const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password, optionArgon2);
    req.body.password = hash;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Le middleware comparePassword utilise l'algorithme Argon2 pour comparer le mot de passe de l'utilisateur avec le mot de passe haché stocké dans la base de données.
 */
const comparePassword: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  try {
    if (await argon2.verify(req.user.password, req.body.password)) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { isRegistered, hashPassword, comparePassword };

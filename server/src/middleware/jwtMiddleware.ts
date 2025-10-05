import jwt from 'jsonwebtoken';
import 'dotenv/config';
import type { RequestHandler } from 'express';
import AuthRepository from '../models/AuthRepository';

// Interface pour le payload JWT
interface JwtPayload {
  email: string;
}

// Vérification immédiate de la variable d'environnement
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

// Fonction pour créer un token JWT
const createToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware de vérification du token JWT
const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await AuthRepository.readUserByEmail(decoded.email);

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Export des fonctions sous forme d'objet structuré
export default { createToken, verifyToken };

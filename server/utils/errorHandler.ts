import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // log simple si besoin
  console.error('❌ Error handled:', err.message);

  // Cas erreur MySQL doublon (email, siren, etc.)
  if (err.message === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      ok: false,
      message: 'Cet enregistrement existe déjà 🚫',
    });
  }

  if (err.message === 'USER_NOT_FOUND') {
    return res.status(401).json({
      ok: false,
      message: 'Utilisateur non trouvé. Veuillez vérifier vos informations. ❌',
    });
  }

  // Cas erreur de validation (ex: Joi, Zod)
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      ok: false,
      message: 'Les données fournies sont invalides ❌',
      details: err.details,
    });
  }

  // Erreur générique
  return res.status(500).json({
    ok: false,
    message: 'Erreur interne du serveur ⚠️',
  });
};

export default errorHandler;

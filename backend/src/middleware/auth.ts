import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token de acceso' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'c1ud4dgu4r1c09879');
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && Array.isArray(req.user.roles) && req.user.roles.includes('admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado: se requieren permisos de administrador' });
  }
}; 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

// Estendendo a interface Request do Express para incluir o id do usuário
export interface CustomRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O formato do header geralmente é "Bearer TOKEN_JWT", vamos separar
  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatado.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as TokenPayload;
    
    // Injeta o ID do usuário dentro da requisição para os próximos controllers usarem
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'secret_key'; // Chave secreta para a verificação dos tokens JWT

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Token de autenticação não fornecido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.userId = decoded.id?.toString(); // Armazena o ID do usuário decodificado na requisição
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}

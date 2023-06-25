import { Request, Response, NextFunction } from 'express';

export function validateInput(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void {
  if (!req.body.nome || !req.body.email || !req.body.senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  if (req.body.senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void {
  if (!req.body.email || !req.body.senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  next();
}

export function validateProfileUpdate(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void {
  if (!req.body.nome && !req.body.email && !req.body.senha) {
    return res.status(400).json({ message: 'Pelo menos um campo deve ser fornecido para atualização' });
  }

  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }
  }

  if (req.body.senha && req.body.senha.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  next();
}

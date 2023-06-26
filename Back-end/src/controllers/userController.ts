// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { nickname, email, password } = req.body;

    // Verificar se o e-mail já está cadastrado
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'E-mail already registered' });
      return;
    }

    // Criar novo usuário
    const newUser: User = { nickname, email, password };
    const createdUser = await UserModel.createUser(newUser);

    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

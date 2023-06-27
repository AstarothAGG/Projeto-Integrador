import { Request, Response } from 'express';
import { UserModel, User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Substitua por sua chave secreta para geração do token JWT

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { nickname, email, password } = req.body;

      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = { nickname, email, password: hashedPassword };
      const createdUser = await UserModel.createUser(newUser);

      res.status(201).json(createdUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ message: 'Successful login', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error during login' });
    }
  }
}

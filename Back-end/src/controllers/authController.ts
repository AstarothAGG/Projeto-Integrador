import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'secret_key'; // Chave secreta para a geração de tokens JWT

// Simulação de um usuário registrado no banco de dados
const user = {
  id: '1',
  username: 'john_doe',
  password: '$2b$10$1kABMkNHIGAr/fY7OghGgOuSZp1aZ2FdGoMjSfZQwz0mjJXuOnfxe', // Senha: password123
};

// Função para autenticar um usuário
export function login(req: Request, res: Response): void {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Credenciais de login inválidas' });
    return;
  }

  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ message: 'Credenciais de login inválidas' });
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
}

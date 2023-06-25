import { Request, Response } from 'express';
import db from '../db';

export function createUser(req: Request, res: Response): void {
  const { name, email, password } = req.body;

  const connection = db.openConnection();

  connection.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    function (error) {
      if (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
      } else {
        console.log('Novo usuário criado com sucesso. ID:', this.lastID);
        res.status(201).json({ message: 'Usuário criado com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}
export function getUserById(arg0: string, getUserById: any) {
    throw new Error('Function not implemented.');
}

export function deleteUser(arg0: string, deleteUser: any) {
    throw new Error('Function not implemented.');
}

export function editUser(arg0: string, editUser: any) {
    throw new Error('Function not implemented.');
}


import { Request, Response } from 'express';
import db from '../db';

// Função para adicionar curtida a uma postagem
export function addLike(req: Request, res: Response): void {
  const postId = req.params.id;

  const connection = db.openConnection();

  connection.run(
    'UPDATE posts SET likes = likes + 1 WHERE id = ?',
    [postId],
    function (error) {
      if (error) {
        console.error('Erro ao adicionar curtida:', error);
        res.status(500).json({ message: 'Erro ao adicionar curtida' });
      } else {
        console.log('Curtida adicionada à postagem. ID:', postId);
        res.status(200).json({ message: 'Curtida adicionada com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}

// Função para remover curtida de uma postagem
export function removeLike(req: Request, res: Response): void {
  const postId = req.params.id;

  const connection = db.openConnection();

  connection.run(
    'UPDATE posts SET likes = likes - 1 WHERE id = ?',
    [postId],
    function (error) {
      if (error) {
        console.error('Erro ao remover curtida:', error);
        res.status(500).json({ message: 'Erro ao remover curtida' });
      } else {
        console.log('Curtida removida da postagem. ID:', postId);
        res.status(200).json({ message: 'Curtida removida com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}

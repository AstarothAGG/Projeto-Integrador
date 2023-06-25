import { Request, Response } from 'express';
import db from '../db';

export function addComment(req: Request, res: Response): void {
  const postId = req.params.id;
  const { content, userId } = req.body;

  const connection = db.openConnection();

  connection.run(
    'INSERT INTO comments (content, postId, userId) VALUES (?, ?, ?)',
    [content, postId, userId],
    function (error) {
      if (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ message: 'Erro ao adicionar comentário' });
      } else {
        console.log('Novo comentário adicionado à postagem. ID:', this.lastID);
        res.status(201).json({ message: 'Comentário adicionado com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}

export function deleteComment(req: Request, res: Response): void {
  const commentId = req.params.id;

  const connection = db.openConnection();

  connection.run('DELETE FROM comments WHERE id = ?', [commentId], function (error) {
    if (error) {
      console.error('Erro ao excluir comentário:', error);
      res.status(500).json({ message: 'Erro ao excluir comentário' });
    } else {
      console.log('Comentário excluído com sucesso. ID:', commentId);
      res.status(200).json({ message: 'Comentário excluído com sucesso' });
    }

    db.closeConnection(connection);
  });
}

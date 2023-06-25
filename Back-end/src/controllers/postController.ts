import { Request, Response } from 'express';
import db from '../db';

export function createPost(req: Request, res: Response): void {
  const { title, content, userId } = req.body;

  const connection = db.openConnection();

  connection.run(
    'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
    [title, content, userId],
    function (error) {
      if (error) {
        console.error('Erro ao criar postagem:', error);
        res.status(500).json({ message: 'Erro ao criar postagem' });
      } else {
        console.log('Nova postagem criada com sucesso. ID:', this.lastID);
        res.status(201).json({ message: 'Postagem criada com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}

export function editPost(req: Request, res: Response): void {
  const postId = req.params.id;
  const { title, content } = req.body;

  const connection = db.openConnection();

  connection.run(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, postId],
    function (error) {
      if (error) {
        console.error('Erro ao editar postagem:', error);
        res.status(500).json({ message: 'Erro ao editar postagem' });
      } else {
        console.log('Postagem editada com sucesso. ID:', postId);
        res.status(200).json({ message: 'Postagem editada com sucesso' });
      }

      db.closeConnection(connection);
    }
  );
}

export function deletePost(req: Request, res: Response): void {
  const postId = req.params.id;

  const connection = db.openConnection();

  connection.run('DELETE FROM posts WHERE id = ?', [postId], function (error) {
    if (error) {
      console.error('Erro ao excluir postagem:', error);
      res.status(500).json({ message: 'Erro ao excluir postagem' });
    } else {
      console.log('Postagem excluída com sucesso. ID:', postId);
      res.status(200).json({ message: 'Postagem excluída com sucesso' });
    }

    db.closeConnection(connection);
  });
}

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

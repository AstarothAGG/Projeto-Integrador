import db from '../db';

export interface Like {
  id?: number;
  postId: number;
  userId: number;
}

export function addLike(like: Like): Promise<void> {
  return new Promise((resolve, reject) => {
    const connection = db.openConnection();

    connection.run(
      'INSERT INTO likes (postId, userId) VALUES (?, ?)',
      [like.postId, like.userId],
      function (error) {
        if (error) {
          console.error('Erro ao adicionar curtida:', error);
          reject(new Error('Erro ao adicionar curtida'));
        } else {
          console.log('Curtida adicionada à postagem. ID:', this.lastID);
          resolve();
        }

        db.closeConnection(connection);
      }
    );
  });
}

export function removeLike(like: Like): Promise<void> {
  return new Promise((resolve, reject) => {
    const connection = db.openConnection();

    connection.run(
      'DELETE FROM likes WHERE postId = ? AND userId = ?',
      [like.postId, like.userId],
      function (error) {
        if (error) {
          console.error('Erro ao remover curtida:', error);
          reject(new Error('Erro ao remover curtida'));
        } else {
          console.log('Curtida removida da postagem. ID:', like.postId);
          resolve();
        }

        db.closeConnection(connection);
      }
    );
  });
}

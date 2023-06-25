import db from '../db';

export interface Comment {
  id?: number;
  content: string;
  postId: number;
  userId: number;
}

export function createComment(comment: Comment): Promise<Comment> {
  return new Promise((resolve, reject) => {
    const connection = db.openConnection();

    connection.run(
      'INSERT INTO comments (content, postId, userId) VALUES (?, ?, ?)',
      [comment.content, comment.postId, comment.userId],
      function (error) {
        if (error) {
          console.error('Erro ao criar comentário:', error);
          reject(new Error('Erro ao criar comentário'));
        } else {
          const createdComment: Comment = {
            id: this.lastID,
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId,
          };

          console.log('Novo comentário criado com sucesso. ID:', createdComment.id);
          resolve(createdComment);
        }

        db.closeConnection(connection);
      }
    );
  });
}

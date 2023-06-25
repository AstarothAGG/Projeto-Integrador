import db from '../db';

export interface Post {
  id?: number;
  title: string;
  content: string;
  userId: number;
  likes?: number;
}

export function createPost(post: Post): Promise<Post> {
  return new Promise((resolve, reject) => {
    const connection = db.openConnection();

    connection.run(
      'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
      [post.title, post.content, post.userId],
      function (error) {
        if (error) {
          console.error('Erro ao criar postagem:', error);
          reject(new Error('Erro ao criar postagem'));
        } else {
          const createdPost: Post = {
            id: this.lastID,
            title: post.title,
            content: post.content,
            userId: post.userId,
          };

          console.log('Nova postagem criada com sucesso. ID:', createdPost.id);
          resolve(createdPost);
        }

        db.closeConnection(connection);
      }
    );
  });
}

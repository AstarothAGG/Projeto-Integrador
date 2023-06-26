// models/User.ts
import { db } from '../database/database';

export interface User {
  id?: number;
  nickname: string;
  email: string;
  password: string;
}

export class UserModel {
  static async createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (nickname, email, password) VALUES (?, ?, ?)',
        [user.nickname, user.email, user.password],
        function (error) {
          if (error) {
            reject(error);
          } else {
            user.id = this.lastID;
            resolve(user);
          }
        }
      );
    });
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        function (error, row) {
          if (error) {
            reject(error);
          } else {
            resolve(row ? (row as User) : null);
          }
        }
      );
    });
  }
}

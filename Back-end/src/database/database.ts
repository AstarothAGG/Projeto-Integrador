import sqlite3 from 'sqlite3';
import path from 'path';

// Conectar ao banco de dados
export const db = new sqlite3.Database('./database');

// Caminho completo do arquivo de banco de dados
const databasePath = path.resolve(__dirname, 'database.db');

// Criar tabela "users"
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )`);
});

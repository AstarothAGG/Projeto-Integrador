import sqlite3 from 'sqlite3';

const DB_PATH = 'src/database.sqlite';

// Função para abrir a conexão com o banco de dados
export function openConnection(): sqlite3.Database {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados estabelecida.');
    }
  });
}

// Função para fechar a conexão com o banco de dados
export function closeConnection(db: sqlite3.Database): void {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
      console.log('Conexão com o banco de dados fechada.');
    }
  });
}

export default {
  openConnection,
  closeConnection
};

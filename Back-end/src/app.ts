import express from 'express';
import userRoutes from './routes/userRoutes';
import { db } from './database/database';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

// Rota para consultar os usuários
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (error, rows) => {
    if (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

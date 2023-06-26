// app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users', userRoutes); // Alteração: Adicionamos "/api" ao caminho da rota

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

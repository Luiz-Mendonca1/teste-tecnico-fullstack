import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes'; 

const app = express();

app.use(cors());
app.use(express.json());

// Vinculando as rotas sob seus respectivos endpoints
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter); 

app.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'API rodando perfeitamente!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
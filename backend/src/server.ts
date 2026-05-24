import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Vinculando as rotas de autenticação sob o prefixo /api/auth
app.use('/api/auth', authRouter);

// Rota de teste de status do servidor
app.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'API rodando perfeitamente!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
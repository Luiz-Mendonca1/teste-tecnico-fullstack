import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'E-mail ou senha inválidos.' });
    }

    const secret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

    return res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
};
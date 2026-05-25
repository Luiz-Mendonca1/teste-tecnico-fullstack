import { Response } from 'express';
import { prisma } from '../prisma';
import { CustomRequest } from '../middlewares/auth.middleware';

// 1. Criar Tarefa
export const createTask = async (req: CustomRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    if (!title) {
      return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: userId!,
      },
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao criar tarefa.' });
  }
};

// 2. Listar Tarefas do Usuário Logado
export const getTasks = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao buscar tarefas.' });
  }
};

// 3. Atualizar Tarefa (Texto ou Conclusão)
export const updateTask = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const userId = req.userId as string; // ✨ Força a tipagem para string pura

  try {
    // Verificar se a tarefa existe e pertence ao usuário logado
    const taskExists = await prisma.task.findFirst({
      where: { 
        id: String(id), // ✨ Garante que é string
        userId: userId  
      },
    });

    if (!taskExists) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado.' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: String(id) },
      data: {
        title: title ?? taskExists.title,
        description: description ?? taskExists.description,
        isCompleted: isCompleted ?? taskExists.isCompleted,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao atualizar tarefa.' });
  }
};

// 4. Excluir Tarefa
export const deleteTask = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId as string; // ✨ Força a tipagem para string pura

  try {
    const taskExists = await prisma.task.findFirst({
      where: { 
        id: String(id), // ✨ Garante que é string
        userId: userId 
      },
    });

    if (!taskExists) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou acesso negado.' });
    }

    await prisma.task.delete({
      where: { id: String(id) },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao excluir tarefa.' });
  }
};
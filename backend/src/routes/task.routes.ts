import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const taskRouter = Router();

// Protege todas as rotas de tarefas abaixo aplicando o middleware
taskRouter.use(authMiddleware);

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
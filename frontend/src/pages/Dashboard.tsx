import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { LogOut, Plus, Trash2, CheckCircle, Circle, Loader2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 1. Carregar Tarefas
  async function loadTasks() {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // 2. Criar Tarefa
  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSubmitting(true);
    try {
      const response = await api.post('/tasks', { 
        title: newTitle, 
        description: newDescription 
      });
      setTasks([response.data, ...tasks]);
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      alert("Erro ao criar tarefa");
    } finally {
      setSubmitting(false);
    }
  }

  // 3. Alternar Conclusão
  async function handleToggleTask(id: string, currentStatus: boolean) {
    try {
      await api.put(`/tasks/${id}`, { isCompleted: !currentStatus });
      setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
    } catch (err) {
      alert("Erro ao atualizar tarefa");
    }
  }

  // 4. Excluir Tarefa
  async function handleDeleteTask(id: string) {
    if (!confirm("Deseja excluir esta tarefa?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert("Erro ao excluir tarefa");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              To-Do List
            </h1>
            <p className="text-xs text-slate-400">Olá, {user?.name}</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Formulário de Nova Tarefa */}
        <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-8 shadow-xl">
          <form onSubmit={handleAddTask} className="space-y-4">
            <input 
              type="text"
              placeholder="Título da tarefa..."
              className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
            <textarea 
              placeholder="Descrição (opcional)"
              className="w-full bg-slate-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />
            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
              Adicionar Tarefa
            </button>
          </form>
        </section>

        {/* Lista de Tarefas */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-400 mb-4 px-2">Suas Tarefas</h2>
          
          {loading ? (
            <div className="flex justify-center p-12 text-slate-500"><Loader2 className="animate-spin" size={32} /></div>
          ) : tasks.length === 0 ? (
            <div className="text-center p-12 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 text-slate-500">
              Nenhuma tarefa encontrada. Comece criando uma acima!
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  task.isCompleted 
                  ? 'bg-slate-900/40 border-slate-800/50 opacity-60' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button 
                  onClick={() => handleToggleTask(task.id, task.isCompleted)}
                  className="mt-1"
                >
                  {task.isCompleted 
                    ? <CheckCircle className="text-emerald-500" /> 
                    : <Circle className="text-slate-600 hover:text-blue-400" />
                  }
                </button>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${task.isCompleted ? 'line-through' : ''}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>

                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
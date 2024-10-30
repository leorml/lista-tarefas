import React, { useState } from 'react';
import { Task } from '../types';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'order'>) => void;
  onClose: () => void;
}

export function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const [task, setTask] = useState({
    name: '',
    cost: 0,
    dueDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nova Tarefa</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Tarefa
            </label>
            <input
              type="text"
              required
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custo (R$)
            </label>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={task.cost}
              onChange={(e) => setTask({ ...task, cost: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Limite
            </label>
            <input
              type="date"
              required
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Adicionar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Tarefa } from '../types';
import { X } from 'lucide-react';

interface FormularioTarefaProps {
  onSubmit: (tarefa: Omit<Tarefa, 'id' | 'ordem'>) => void;
  onFechar: () => void;
}

export function FormularioTarefa({ onSubmit, onFechar }: FormularioTarefaProps) {
  // Estado inicial do formulário
  const [tarefa, setTarefa] = useState({
    nome: '',
    custo:'' ,
    dataLimite: new Date().toISOString().split('T')[0],
  });

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tarefa);
    onFechar();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nova Tarefa</h2>
          <button onClick={onFechar} className="text-gray-500 hover:text-gray-700">
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
              value={tarefa.nome}
              onChange={(e) => setTarefa({ ...tarefa, nome: e.target.value })}
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
              value={tarefa.custo}
              onChange={(e) => setTarefa({ ...tarefa, custo: Number(e.target.value) })}
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
              value={tarefa.dataLimite}
              onChange={(e) => setTarefa({ ...tarefa, dataLimite: e.target.value })}
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
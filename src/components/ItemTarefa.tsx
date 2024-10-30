import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tarefa } from '../types';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

interface ItemTarefaProps {
  tarefa: Tarefa;
  onAtualizar: (tarefa: Tarefa) => void;
  onExcluir: (tarefaId: number) => void;
}

export function ItemTarefa({ tarefa, onAtualizar, onExcluir }: ItemTarefaProps) {
  // Estado para controlar modo de edição
  const [editando, setEditando] = useState(false);
  // Estado para armazenar dados da tarefa em edição
  const [tarefaEditada, setTarefaEditada] = useState(tarefa);

  // Configuração do drag and drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tarefa.id });

  const estilo = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Função para salvar alterações
  const handleSalvar = () => {
    onAtualizar(tarefaEditada);
    setEditando(false);
  };

  // Função para confirmar e executar exclusão
  const handleExcluir = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onExcluir(tarefa.id);
    }
  };

  // Verifica se o custo é alto (>= 1000)
  const custoAlto = tarefa.custo >= 1000;

  return (
    <div
      ref={setNodeRef}
      style={estilo}
      className={`group relative flex items-center gap-4 p-4 rounded-lg shadow-sm border ${
        custoAlto ? 'bg-yellow-50' : 'bg-white'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </div>

      {editando ? (
        <div className="flex-1 grid grid-cols-3 gap-4">
          <input
            type="text"
            value={tarefaEditada.nome}
            onChange={(e) =>
              setTarefaEditada({ ...tarefaEditada, nome: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
            placeholder="Nome da tarefa"
          />
          <input
            type="number"
            value={tarefaEditada.custo}
            onChange={(e) =>
              setTarefaEditada({ ...tarefaEditada, custo: Number(e.target.value) })
            }
            className="px-3 py-2 border rounded-lg"
            placeholder="Custo"
            step="0.01"
          />
          <input
            type="date"
            value={tarefaEditada.dataLimite}
            onChange={(e) =>
              setTarefaEditada({ ...tarefaEditada, dataLimite: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-4">
          <span className="text-gray-800">{tarefa.nome}</span>
          <span className="text-gray-600">
            R$ {tarefa.custo.toFixed(2)}
          </span>
          <span className="text-gray-600">
            {format(new Date(tarefa.dataLimite), 'dd/MM/yyyy')}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {editando ? (
          <button
            onClick={handleSalvar}
            className="text-green-600 hover:text-green-700"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={() => setEditando(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Pencil size={20} />
          </button>
        )}
        <button
          onClick={handleExcluir}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
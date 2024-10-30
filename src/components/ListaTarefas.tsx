import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Tarefa } from '../types';
import { ItemTarefa } from './ItemTarefa';
import { Plus } from 'lucide-react';

interface ListaTarefasProps {
  tarefas: Tarefa[];
  onAtualizarTarefa: (tarefa: Tarefa) => void;
  onExcluirTarefa: (tarefaId: number) => void;
  onReordenarTarefas: (tarefas: Tarefa[]) => void;
  onAdicionarTarefa: () => void;
}

export function ListaTarefas({
  tarefas,
  onAtualizarTarefa,
  onExcluirTarefa,
  onReordenarTarefas,
  onAdicionarTarefa,
}: ListaTarefasProps) {
  // Configuração dos sensores para drag and drop
  const sensores = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Função executada ao finalizar o arrastar e soltar
  const handleFimArrasto = (evento: DragEndEvent) => {
    const { active, over } = evento;

    if (over && active.id !== over.id) {
      const indiceAntigo = tarefas.findIndex((tarefa) => tarefa.id === active.id);
      const indiceNovo = tarefas.findIndex((tarefa) => tarefa.id === over.id);
      const novasTarefas = arrayMove(tarefas, indiceAntigo, indiceNovo).map((tarefa, index) => ({
        ...tarefa,
        ordem: index + 1,
      }));
      onReordenarTarefas(novasTarefas);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Tarefas</h1>
        <button
          onClick={onAdicionarTarefa}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      <DndContext
        sensors={sensores}
        collisionDetection={closestCenter}
        onDragEnd={handleFimArrasto}
      >
        <SortableContext items={tarefas} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tarefas.map((tarefa) => (
              <ItemTarefa
                key={tarefa.id}
                tarefa={tarefa}
                onAtualizar={onAtualizarTarefa}
                onExcluir={onExcluirTarefa}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
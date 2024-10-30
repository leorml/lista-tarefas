import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { Pencil, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      onDelete(task.id);
    }
  };

  const isExpensive = task.cost >= 1000;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-4 p-4 rounded-lg shadow-sm border ${
        isExpensive ? 'bg-yellow-50' : 'bg-white'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </div>

      {isEditing ? (
        <div className="flex-1 grid grid-cols-3 gap-4">
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
            placeholder="Nome da tarefa"
          />
          <input
            type="number"
            value={editedTask.cost}
            onChange={(e) =>
              setEditedTask({ ...editedTask, cost: Number(e.target.value) })
            }
            className="px-3 py-2 border rounded-lg"
            placeholder="Custo"
            step="0.01"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-3 gap-4">
          <span className="text-gray-800">{task.name}</span>
          <span className="text-gray-600">
            R$ {task.cost.toFixed(2)}
          </span>
          <span className="text-gray-600">
            {format(new Date(task.dueDate), 'dd/MM/yyyy')}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-700"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Pencil size={20} />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
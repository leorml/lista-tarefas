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
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onTasksReorder: (tasks: Task[]) => void;
  onAddTask: () => void;
}

export function TaskList({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTasksReorder,
  onAddTask,
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
        ...task,
        order: index + 1,
      }));
      onTasksReorder(newTasks);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Tarefas</h1>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
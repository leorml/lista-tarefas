import React, { useState } from 'react';
import { ListaTarefas } from './components/ListaTarefas';
import { FormularioTarefa } from './components/FormularioTarefa';
import { Tarefa } from './types';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  // Estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  // Estado para controlar a exibição do formulário
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Função para adicionar uma nova tarefa
  const handleAdicionarTarefa = (novaTarefa: Omit<Tarefa, 'id' | 'ordem'>) => {
    if (tarefas.some(tarefa => tarefa.nome === novaTarefa.nome)) {
      toast.error('Já existe uma tarefa com este nome!');
      return;
    }

    const tarefa: Tarefa = {
      ...novaTarefa,
      id: Date.now(),
      ordem: tarefas.length + 1,
    };

    setTarefas([...tarefas, tarefa]);
    toast.success('Tarefa adicionada com sucesso!');
  };

  // Função para atualizar uma tarefa existente
  const handleAtualizarTarefa = (tarefaAtualizada: Tarefa) => {
    if (tarefas.some(tarefa => tarefa.nome === tarefaAtualizada.nome && tarefa.id !== tarefaAtualizada.id)) {
      toast.error('Já existe uma tarefa com este nome!');
      return;
    }

    setTarefas(tarefas.map(tarefa => 
      tarefa.id === tarefaAtualizada.id ? tarefaAtualizada : tarefa
    ));
    toast.success('Tarefa atualizada com sucesso!');
  };

  // Função para excluir uma tarefa
  const handleExcluirTarefa = (tarefaId: number) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== tarefaId));
    toast.success('Tarefa excluída com sucesso!');
  };

  // Função para reordenar as tarefas
  const handleReordenarTarefas = (tarefasReordenadas: Tarefa[]) => {
    setTarefas(tarefasReordenadas);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ListaTarefas
        tarefas={tarefas.sort((a, b) => a.ordem - b.ordem)}
        onAtualizarTarefa={handleAtualizarTarefa}
        onExcluirTarefa={handleExcluirTarefa}
        onReordenarTarefas={handleReordenarTarefas}
        onAdicionarTarefa={() => setMostrarFormulario(true)}
      />
      {mostrarFormulario && (
        <FormularioTarefa
          onSubmit={handleAdicionarTarefa}
          onFechar={() => setMostrarFormulario(false)}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
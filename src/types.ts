// Interface que define a estrutura de uma tarefa
export interface Tarefa {
  id: number;
  nome: string;
  custo: number;
  dataLimite: string;
  ordem: number;
}
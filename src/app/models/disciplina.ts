export class Disciplina {
    id!: number; // Usando "!"
    nome: string;
    descricao: string;
  
    constructor(id?: number, nome: string = '', descricao: string = '') {
      if (id !== undefined) {
        this.id = id;
      }
      this.nome = nome;
      this.descricao = descricao;
    }
  }
  
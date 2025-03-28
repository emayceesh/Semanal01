import { Turma } from "./turma";

export class Professor {
    id!: number;
    nomeProfessor!: string;
    cpf!: string;
    email!: string;
    especialidade!: string;
    turma!: Turma[];//para a lista turma
  disciplina: import("b:/Faculdade/Semanal/Semanal01/src/app/models/disciplina").Disciplina | undefined;
}

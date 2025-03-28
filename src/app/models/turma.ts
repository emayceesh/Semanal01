import { Aluno } from "./aluno";
import { Curso } from "./curso";
import { Professor } from "./professor";

export class Turma {
    id!: number;
    nomeTurma!: string;
    semestre!: string;
    anoTurma!: string;
    turno!: string;
    //alunos!: Aluno[];//para a lista de alunos
    //curso!: Curso;//para o objeto curso
    //professor!: Professor[];//para a lista de professores
}

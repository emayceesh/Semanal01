import { Curso } from "./curso";
import { Turma } from "./turma";

export class Aluno {
    id!: number;
    nomeCompleto!: string;
    cpf!: string;
    telefone!: string;
    cadastroCompleto!: boolean;
    turma!: Turma;
    curso!: Curso;//para o objeto curso
}

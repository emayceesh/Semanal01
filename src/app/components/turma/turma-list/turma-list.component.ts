import { Component } from '@angular/core';
import { Turma } from '../../../models/turma';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss',
})
export class TurmaListComponent {
  lista: Turma[] = [];

  constructor() {
    this.findAll();
  }

  findAll(){
    let turma1 = new Turma();
    turma1.id = 1;
    turma1.nomeTurma = 'Turma A';
    turma1.semestre = '1º';
    turma1.anoTurma = '2024';
    turma1.turno = 'Matutino';
    
    let turma2 = new Turma();
    turma2.id = 2;
    turma2.nomeTurma = 'Turma B';
    turma2.semestre = '2º';
    turma2.anoTurma = '2024';
    turma2.turno = 'Vespertino';
    
    let turma3 = new Turma();
    turma3.id = 3;
    turma3.nomeTurma = 'Turma C';
    turma3.semestre = '1º';
    turma3.anoTurma = '2025';
    turma3.turno = 'Noturno';

    this.lista.push(turma1, turma2, turma3);
  }

  delete(turma: Turma){
    let indice = this.lista.findIndex(x => {return x.id == turma.id});
    if(confirm('Turma removida com sucesso!')){
      this.lista.splice(indice, 1); //deletando um objeto na posição INDICE
    }
  }
}

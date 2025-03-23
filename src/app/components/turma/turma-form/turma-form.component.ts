import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Turma } from '../../../models/turma';

@Component({
  selector: 'app-turma-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './turma-form.component.html',
  styleUrl: './turma-form.component.scss',
})
export class TurmaFormComponent {
  turma = new Turma();

  rotaAtivida = inject(ActivatedRoute);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      //AQUI VC VAI CHAMAR O FINDBYID()

      let turma1 = new Turma();
      turma1.id = 1;
      turma1.nomeTurma = 'Turma A';
      turma1.semestre = '1º Semestre';
      turma1.anoTurma = '2024';
      turma1.turno = 'Matutino';
      this.turma = turma1; //setar o objeto no formulário
    }
  }

  save() {
    if (this.turma.id > 0) {
      // UPDATE
      alert('Turma alterada com sucesso!');
    } else {
      // SAVE
      alert('Turma cadastrada com sucesso!');
    }
  }
}

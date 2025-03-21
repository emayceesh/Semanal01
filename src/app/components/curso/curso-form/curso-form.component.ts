import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss',
})
export class CursoFormComponent {
  curso = new Curso();

  rotaAtivida = inject(ActivatedRoute);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      //AQUI VC VAI CHAMAR O FINDBYID()

      let curso1 = new Curso();
      curso1.id = 1;
      curso1.nomeCurso = 'Fisica Teórica';
      this.curso = curso1; //setar o objeto no carro do formulario
    }
  }

  save() {
    if (this.curso.id > 0) {
      // UPDATE
      alert('Curso alterado com sucesso!.');
    } else {
      // SAVE
      alert('Curso cadastrado com sucesso!');
    }
  }
}

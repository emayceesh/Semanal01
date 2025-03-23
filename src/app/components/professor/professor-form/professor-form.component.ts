import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Professor } from '../../../models/professor';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.scss',
})
export class ProfessorFormComponent {
  professor = new Professor();

  rotaAtivida = inject(ActivatedRoute);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      

      let professor1 = new Professor();
      professor1.id = 1;
      professor1.nomeProfessor = 'sexasa';
      professor1.cpf = '123.456.789-00';
      professor1.email = 'haxieixersidade.com';
      professor1.especialidade = 'Relatividade';
      this.professor = professor1; 
    }
  }

  save() {
    if (this.professor.id > 0) {
      // UPDATE
      alert('Professor alterado com sucesso!');
    } else {
      // SAVE
      alert('Professor cadastrado com sucesso!');
    }
  }
}

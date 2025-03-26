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
    
  }

 
}

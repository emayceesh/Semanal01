import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.scss',
})
export class ProfessorFormComponent {
  professor: Professor = new Professor();

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  professorService = inject(ProfessorService);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.professorService.findById(id).subscribe({
      next: (professorRetornado) => {
        this.professor = professorRetornado;
      },
      error: (erro) => {
        alert('Deu erro!');
      },
    });
  }

  save() {
    if (this.professor.id > 0) {
      // UPDATE
      this.professorService
        .update(this.professor, this.professor.id)
        .subscribe({
          next: (mensagem) => {
            alert(mensagem);
            this.roteador.navigate(['admin/professor']);
          },
          error: (erro) => {
            alert('Deu erro!');
          },
        });
    } else {
      // SAVE
      this.professorService.save(this.professor).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/professor']);
        },
        error: (erro) => {
          alert('Deu erro!');
        },
      });
    }
  }
}

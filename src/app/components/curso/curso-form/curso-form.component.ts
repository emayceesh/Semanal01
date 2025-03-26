import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';

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
  roteador = inject(Router);
  cursoService = inject(CursoService);

  constructor() {
    let id = this.rotaAtivida.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.cursoService.findById(id).subscribe({
      next: (cursoRetornado) => {
        this.curso = cursoRetornado;
      },
      error: (erro) => {
        alert('Deu erro!');
      },
    });
  }

  save() {
    if (this.curso.id > 0) {
      // UPDATE
      this.cursoService.update(this.curso, this.curso.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/aluno']);
        },
        error: (erro) => {
          alert('Deu erro!');
        },
      });
    } else {
      // SAVE
      this.cursoService.save(this.curso).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/aluno']);
        },
        error: (erro) => {
          alert('Deu erro!');
        },
      });
    }
  }
}

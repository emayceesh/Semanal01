import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina.service';
import { Disciplina } from '../../models/disciplina';
import { CommonModule } from '@angular/common'; // Adicionando CommonModule
import { MdbModalModule, MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule], // Adicionando CommonModule aqui
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.scss']
})
export class DisciplinaFormComponent {

  disciplina: Disciplina = new Disciplina();

  rotaAtivada = inject(ActivatedRoute);
  roteador = inject(Router);
  disciplinaService = inject(DisciplinaService);

  constructor() {
    let id = this.rotaAtivada.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.disciplinaService.findById(id).subscribe({
      next: (disciplinaRetornada) => {
        this.disciplina = disciplinaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  save() {
    if (this.disciplina.id > 0) {
      // UPDATE
      this.disciplinaService.update(this.disciplina.id, this.disciplina).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem.toString(), '', 'success');
          this.roteador.navigate(['admin/disciplinas']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });

    } else {
      // SAVE
      this.disciplinaService.save(this.disciplina).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem.toString(), '', 'success');
          this.roteador.navigate(['admin/disciplinas']);
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });
    }
  }
}

import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Disciplina } from '../../../models/disciplina';
import { DisciplinaService } from '../../../services/disciplina.service';
// Removed DisciplinaListComponent import as it is not statically analyzable

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],  // Removed DisciplinaListComponent from imports
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss'],
})
export class ProfessorFormComponent {

  @Input("professor") professor: Professor = new Professor();
  @Output("meuEvento") meuEvento = new EventEmitter(); // Vai emitir qualquer coisa

  listaDisciplinas!: Disciplina[];

  rotaAtivada = inject(ActivatedRoute);
  roteador = inject(Router);
  professorService = inject(ProfessorService);
  disciplinaService = inject(DisciplinaService);

  @ViewChild("modalDisciplinaList") modalDisciplinaList!: TemplateRef<any>; // Alterado para Disciplina
  modalService = inject(MdbModalService);  // Para abrir a modal
  modalRef!: MdbModalRef<any>;  // Para conseguir fechar a modal depois

  constructor() {
    let id = this.rotaAtivada.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
    this.findAllDisciplinas();
  }

  findById(id: number) {
    this.professorService.findById(id).subscribe({
      next: (professorRetornado) => {
        this.professor = professorRetornado;
      },
      error: (erro) => {
        Swal.fire('Erro ao buscar professor!', '', 'error');
      },
    });
  }

  save() {
    if (this.professor.id > 0) {
      // UPDATE
      this.professorService.update(this.professor, this.professor.id).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/professores']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        },
      });
    } else {
      // SAVE
      this.professorService.save(this.professor).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/professores']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        },
      });
    }
  }

  findAllDisciplinas() {
    this.disciplinaService.findAll().subscribe({
      next: (lista) => {
        this.listaDisciplinas = lista;
      },
      error: (erro) => {
        Swal.fire('Erro ao carregar disciplinas!', '', 'error');
      },
    });
  }

  compareId(a: Disciplina, b: Disciplina) {
    return a && b ? a.id === b.id : a === b;
  }

  meuEventoTratamento(disciplina: Disciplina) {
    this.professor.disciplina = disciplina;  // Agora atribui a disciplina ao professor
    this.modalRef.close();
  }

  buscarDisciplina() {
    this.modalRef = this.modalService.open(this.modalDisciplinaList, { modalClass: 'modal-xl' });
  }
}

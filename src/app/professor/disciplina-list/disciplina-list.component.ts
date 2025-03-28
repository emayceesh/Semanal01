import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Disciplina } from '../../models/disciplina';
import { DisciplinaService } from '../../services/disciplina.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disciplinas-list',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule],
  templateUrl: './disciplinas-list.component.html', // Certifique-se de que o caminho está correto
  styleUrls: ['./disciplinas-list.component.scss'],
})
export class DisciplinasListComponent {

  lista: Disciplina[] = [];
  pesquisa: string = "";
  disciplinaEdit!: Disciplina;

  disciplinaService: DisciplinaService = inject(DisciplinaService);

  @ViewChild("modalDisciplinaForm") modalDisciplinaForm!: TemplateRef<any>;
  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.disciplinaService.findAll().subscribe({
      next: (listaRetornada: Disciplina[]) => {
        this.lista = listaRetornada;
      },
      error: (erro: { error: string | undefined; }) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  delete(disciplina: Disciplina) {
    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.disciplinaService.deleteById(disciplina.id).subscribe({
          next: () => {
            Swal.fire('Disciplina excluída com sucesso!', '', 'success');
            this.findAll();  // Atualizar a lista após a exclusão
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
      }
    });
  }

  findByNome() {
    this.disciplinaService.findByNome(this.pesquisa).subscribe({
      next: (lista: Disciplina[]) => {
        this.lista = lista;
      },
      error: (erro: { error: string | undefined; }) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  }

  new() {
    this.disciplinaEdit = new Disciplina(); 
    this.modalRef = this.modalService.open(this.modalDisciplinaForm, { modalClass: 'modal-xl' });
  }

  edit(disciplina: Disciplina) {
    this.disciplinaEdit = disciplina; 
    this.modalRef = this.modalService.open(this.modalDisciplinaForm, { modalClass: 'modal-xl' });
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }
}

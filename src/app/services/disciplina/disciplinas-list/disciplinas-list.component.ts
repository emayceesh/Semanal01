import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { Disciplina } from '../../../models/disciplina';
import { DisciplinaService } from '../../disciplina.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-disciplinas-list',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule, MdbModalModule,RouterModule],
  templateUrl: './disciplinas-list.component.html', // Certifique-se de que esse caminho está correto
  styleUrls: ['./disciplinas-list.component.scss'],
})
export class DisciplinasListComponent {

  lista: Disciplina[] = [];
  pesquisa: string = "";
  disciplinaEdit!: Disciplina;
  modoModal: boolean = false; // se true, ativa o modo de seleção via modal

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

  // Implementação do método selecionar, para quando estiver em modo modal
  selecionar(disciplina: Disciplina) {
    this.disciplinaEdit = disciplina;
    this.modalRef.close();
    // Aqui você pode emitir um evento ou realizar outra ação com a disciplina selecionada, se necessário
  }

  meuEventoTratamento(mensagem: any) {
    this.findAll();
    this.modalRef.close();
  }
}

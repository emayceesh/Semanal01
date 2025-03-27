import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProfessorFormComponent } from "../professor-form/professor-form.component";
  //  daffsadsa
@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [ProfessorFormComponent],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss',
})
export class ProfessorListComponent {
  lista: Professor[] = [];
  pesquisa: string = '';
  professorEdit!:Professor;

  professorService = inject(ProfessorService);
  @ViewChild("modalCarroForm") modalProfessorForm!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois

  constructor() {
    this.findAll();
  }

  findAll(){
   
    this.professorService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        alert(erro.error)
      }
    });
    
  }

  delete(professor: Professor){

    Swal.fire({
      title: 'Deseja mesmo deleatar?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {

        this.professorService.deleteById(professor.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
        
      }
    });
  }
  
  edit(professor: Professor){
    this.professorEdit = professor; //carregando o carroEdit com o carro clicado na tabela
    this.modalRef = this.modalService.open(this.modalProfessorForm);
  }
  findByNome(){

    this.professorService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }

  new(){ //ABRIRRRRRRRRRRRRRRRRRR
    this.professorEdit = new Professor(); //limpando o carroEdit para um novo cadastro
    this.modalRef = this.modalService.open(this.modalProfessorForm);
  }
  meuEventoTratamento(mensagem:any){
    this.findAll();
    this.modalRef.close();
  }
//commit
}


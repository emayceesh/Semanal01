import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { ProfessorListComponent } from '../professor-list/professor-list.component';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ProfessorListComponent],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.scss',
})
export class ProfessorFormComponent {

  @Input("professor") professor: Professor = new Professor();
  @Output("meuEvento") meuEvento = new EventEmitter(); //ELE VAI PEGAR QUALQUER COISA E EMITIR

  

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  professorService = inject(ProfessorService);

  @ViewChild("modalProfessorList") modalMarcasList!: TemplateRef<any>; //referência ao template da modal
  modalService = inject(MdbModalService); //para abrir a modal
  modalRef!: MdbModalRef<any>; //vc conseguir fechar a modal depois


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
    } else{
      // SAVE
      this.professorService.save(this.professor).subscribe({
        next: (mensagem) => {
          Swal.fire(mensagem, '', 'success');
          this.roteador.navigate(['admin/carros']);
          this.meuEvento.emit("OK");
        },
        error: (erro) => {
          Swal.fire(erro.error, '', 'error');
        }
      });

    }
  }


  compareId(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

  meuEventoTratamento(professor: Professor){
    this.professor.nomeProfessor = professor.nomeProfessor;
    this.professor.id = professor.id;
    this.modalRef.close();
  }
  }










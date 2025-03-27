import { Component } from '@angular/core';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss',
})
export class ProfessorListComponent {
  lista: Professor[] = [];

  professorService = inject(ProfessorService);

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
    if(confirm('Deseja deletar isso aí?')){

      this.professorService.deleteById(professor.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.findAll();
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });
       }
  }
}

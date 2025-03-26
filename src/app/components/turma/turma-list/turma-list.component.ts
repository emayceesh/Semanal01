import { Component, inject } from '@angular/core';
import { Turma } from '../../../models/turma';
import { Professor } from '../../../models/professor';
import { TurmaService } from '../../../services/turma.service';

@Component({
  selector: 'app-turma-list',
  standalone: true,
  imports: [],
  templateUrl: './turma-list.component.html',
  styleUrl: './turma-list.component.scss',
})
export class TurmaListComponent {
  lista: Turma[] = [];

  turmaService = inject(TurmaService);

  constructor() {
    this.findAll();
  }

  findAll(){
     
      this.turmaService.findAll().subscribe({
        next: (listaRetornada) => {
          this.lista = listaRetornada;
        },
        error: (erro) => {
          alert('ERROOOOU!');
        }
      });
    
    }
  
    delete(turma: Turma){
      if(confirm('Deseja deletar isso aí?')){
  
        this.turmaService.deleteById(turma.id).subscribe({
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

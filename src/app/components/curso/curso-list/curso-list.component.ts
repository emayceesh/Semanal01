import { Component } from '@angular/core';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.scss'
})
export class CursoListComponent {

  lista: Curso[] = [];
  
    constructor() {
      this.findAll();
    }
  
    findAll(){
      let curso1 = new Curso();
      curso1.id = 1;
      curso1.nomeCurso = 'Fisica Teórica';
  
      let curso2 = new Curso();
      curso2.id = 2;
      curso2.nomeCurso = 'Paranoia Aplicada';
  
      let curso3 = new Curso();
      curso3.id = 3;
      curso3.nomeCurso = 'Agronomia Estelar ';
  
      this.lista.push(curso1, curso2, curso3);
    }
  
    delete(curso: Curso){
      let indice = this.lista.findIndex(x => {return x.id == curso.id});
      if(confirm('Curso deletado com sucesso!')){
        this.lista.splice(indice, 1); //deletando um objeto na posição INDICE
      }
    }

}

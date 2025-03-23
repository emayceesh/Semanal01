import { Component } from '@angular/core';
import { Professor } from '../../../models/professor';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss',
})
export class ProfessorListComponent {
  lista: Professor[] = [];

  constructor() {
    this.findAll();
  }

  findAll(){
    let professor1 = new Professor();
    professor1.id = 1;
    professor1.nomeProfessor = 'Albert Einstein';
    professor1.cpf = '111.222.333-45';
    professor1.email = 'einstein@universidade.com';
    professor1.especialidade = 'Relatividade';
    
    let professor2 = new Professor();
    professor2.id = 2;
    professor2.nomeProfessor = 'Isaac Newton';
    professor2.cpf = '222.333.444-56';
    professor2.email = 'newton@universidade.com';
    professor2.especialidade = 'Cálculo e Gravidade';
    
    let professor3 = new Professor();
    professor3.id = 3;
    professor3.nomeProfessor = 'Marie Curie';
    professor3.cpf = '333.444.555-67';
    professor3.email = 'curie@universidade.com';
    professor3.especialidade = 'Radioatividade';

    this.lista.push(professor1, professor2, professor3);
  }

  delete(professor: Professor){
    let indice = this.lista.findIndex(x => {return x.id == professor.id});
    if(confirm('Professor removido com sucesso!')){
      this.lista.splice(indice, 1); 
    }
  }
}

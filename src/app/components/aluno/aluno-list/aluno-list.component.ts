import { Component } from '@angular/core';
import { Aluno } from '../../../models/aluno';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss',
})
export class AlunoListComponent {
  lista: Aluno[] = [];

  constructor() {
    this.findAll();
  }

  findAll(){
    let aluno1 = new Aluno();
    aluno1.id = 1;
    aluno1.nomeCompleto = 'Mufasa';
    aluno1.cpf = '111.222.333-45';
    aluno1.telefone = '45 99942-3454';
    aluno1.cadastroCompleto = true;
    


    let aluno2 = new Aluno();
    aluno2.id = 2;
    aluno2.nomeCompleto = 'Chassi torto';
    aluno2.cpf = '111.222.333-45';
    aluno2.telefone = '45 99942-3454';
    aluno2.cadastroCompleto = true;

    let aluno3 = new Aluno();
    aluno3.id = 3;
    aluno3.nomeCompleto = 'tirulinpa';
    aluno3.cpf = '111.222.333-45';
    aluno3.telefone = '45 99942-3454';
    aluno3.cadastroCompleto = true;

    this.lista.push(aluno1, aluno2, aluno3);
  }

  delete(aluno: Aluno){
    let indice = this.lista.findIndex(x => {return x.id == aluno.id});
    if(confirm('Desmatricula efetuada com sucesso!')){
      this.lista.splice(indice, 1); //deletando um objeto na posição INDICE
    }
  }

}

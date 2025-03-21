import { Component, inject } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { ActivatedRoute } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent {


  aluno = new Aluno();

  rotaAtivida = inject(ActivatedRoute);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){

      //AQUI VC VAI CHAMAR O FINDBYID()
      
      let aluno1 = new Aluno();
      aluno1.id = 1;
      aluno1.nomeCompleto = 'Mufasa';
      aluno1.cpf = '111.222.333-45';
      aluno1.telefone = '45 99942-3454';
      this.aluno = aluno1; //setar o objeto no carro do formulario
    }
  }

  save(){
    if(this.aluno.id > 0){
      // UPDATE
      alert('Aluno alterado com sucesso.');
    }else{
      // SAVE
      alert('Aluno matriculado com sucesso!');
    }
  }
}

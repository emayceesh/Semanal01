import { Component, inject } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss'
})
export class AlunoFormComponent {


  aluno: Aluno = new Aluno();

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  alunoService = inject(AlunoService);

  constructor(){
    let id = this.rotaAtivida.snapshot.params['id'];
    if(id){
      this.findById(id);
    }
  }

  findById(id: number){

    this.alunoService.findById(id).subscribe({
      next: (alunoRetornado) => {
        this.aluno = alunoRetornado;
      },
      error: (erro) => {
        alert('Deu erro!');
      }
    });

  }

  save(){
    if(this.aluno.id > 0){
      // UPDATE
      this.alunoService.update(this.aluno, this.aluno.id).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/aluno']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }else{
      // SAVE
      this.alunoService.save(this.aluno).subscribe({
        next: (mensagem) => {
          alert(mensagem);
          this.roteador.navigate(['admin/aluno']);
        },
        error: (erro) => {
          alert('Deu erro!');
        }
      });


    }
  }
}

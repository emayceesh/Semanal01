import { Component, inject } from '@angular/core';
import { Aluno } from '../../../models/aluno';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [],
  templateUrl: './aluno-list.component.html',
  styleUrl: './aluno-list.component.scss',
})
export class AlunoListComponent {
  lista: Aluno[] = [];

  alunoService = inject(AlunoService);

  constructor() {
    this.findAll();
  }

  findAll(){
  }

}

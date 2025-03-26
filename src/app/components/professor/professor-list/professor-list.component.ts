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
    
  }
}

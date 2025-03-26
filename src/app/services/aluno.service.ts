import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/alunos';

  constructor() { }

  findAll(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.API+'/findAll');
  }

  findById(id: number): Observable<Aluno>{
    return this.http.get<Aluno>(this.API+'/findById/'+id)
  }

  deleteById(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/deleteById/'+id, {responseType: 'text' as 'json'})
  }

  save(aluno: Aluno): Observable<string> {
    return this.http.post<string>(this.API+'/save', aluno, {responseType: 'text' as 'json'})
  }

  update(aluno: Aluno, id: number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id, aluno, {responseType: 'text' as 'json'})
  }
}

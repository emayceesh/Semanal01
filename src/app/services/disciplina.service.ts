import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/disciplina';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/disciplina';

  constructor() {}

  // Buscar todas as disciplinas
  findAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.API}/findAll`);
  }
//effeqsdsdasd
  // Buscar disciplinas por nome
  findByNome(nome: string): Observable<Disciplina[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<Disciplina[]>(`${this.API}/findByNome`, { params });
  }

  // Buscar disciplina por ID
  findById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.API}/findById/${id}`);
  }

  // Excluir disciplina por ID
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/deleteById/${id}`);
  }

  // Salvar uma nova disciplina
  save(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(`${this.API}/save`, disciplina);
  }

  // Atualizar uma disciplina existente
  update(id: number, disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.API}/update/${id}`, disciplina);
  }
}

import { Routes } from '@angular/router';
import { AlunoListComponent } from './components/aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './components/aluno/aluno-form/aluno-form.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginComponent } from './components/layout/login/login.component';
import { CursoListComponent } from './components/curso/curso-list/curso-list.component';
import { CursoFormComponent } from './components/curso/curso-form/curso-form.component';
import { ProfessorListComponent } from './components/professor/professor-list/professor-list.component';
import { ProfessorFormComponent } from './components/professor/professor-form/professor-form.component';
import { TurmaListComponent } from './components/turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './components/turma/turma-form/turma-form.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "aluno", component: AlunoListComponent},
        {path: "aluno/new", component: AlunoFormComponent},
        {path: "aluno/new/:id", component: AlunoFormComponent},
        {path: "curso", component: CursoListComponent},
        {path: "curso/new", component: CursoFormComponent},
        {path: "curso/new/:id", component: CursoFormComponent},
        {path: "professor", component: ProfessorListComponent},
        {path: "professor/new", component: ProfessorFormComponent},
        {path: "professor/new/:id", component: ProfessorFormComponent},
        {path: "turma", component: TurmaListComponent},
        {path: "turma/new", component: TurmaFormComponent},
        {path: "turma/new/:id", component: TurmaFormComponent}
        
    ]}
];

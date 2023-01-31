import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./projects/projects.module').then((p) => p.ProjectsModule),
  }
  // {
  //   path: 'projects',
  //   component: ProjectsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../Models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>('http://localhost:3000/projects');
  }

  createProject(project: IProject): Observable<IProject> {
    return this._http.post<IProject>('http://localhost:3000/projects', project);
  }

  updateProject(project: IProject): Observable<IProject> {
    return this._http.put<IProject>(`http://localhost:3000/projects/${project.id}`, project);
  }

  deleteProject(projectId: number): Observable<void> {
    return this._http.delete<void>(`http://localhost:3000/projects/${projectId}`);
  }

}

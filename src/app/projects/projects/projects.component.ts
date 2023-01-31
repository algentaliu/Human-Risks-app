import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IProject } from 'src/app/Models/project.model';
import { loadProjects, createProject, updateProject, deleteProject } from 'src/app/store/project.actions';
import { selectProjects } from 'src/app/store/project.selector';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Appstate } from 'src/app/store/app-store/appstate';
import { selectAppState } from 'src/app/store/app-store/app.selector';
import { setAPIStatus } from 'src/app/store/app-store/app.action';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  project: IProject = {
    id: 0,
    name: "",
    created: new Date()
  }

  emptyEditProject: IProject = { 
    id: 0,
    name: "",
    created: new Date()
  };

  dialogTitle: string = "Add new Project";

  deleteProjectId: number = 0;

  constructor(private store: Store, private appStore: Store<Appstate>) { 
  }

  projects: IProject[] = [];
  displayedColumns: string[] = ['id', 'name', 'created'];

  projects$ = this.store.select((s: any) => {
    this.projects = s.myprojects.projects;
    return s.myprojects.projects;
  });

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
  }

  displayStyle = "none";
  displayStyleDelete = "none";

  openDeleteDialog(id: number): void {
    this.displayStyleDelete = "block";
    this.deleteProjectId = id;
  }

  closeDeleteDialog(): void {
    this.displayStyleDelete = "none";
  }
  
  openPopup(mode: string): void  {
    this.dialogTitle = mode === "new" ? "Add new Project" : "Edit Project";
    this.displayStyle = "block";
  }

  closePopup(): void  {
    this.displayStyle = "none";
  }

  saveProject(): void  {
    
    if (this.emptyEditProject.id > 0) {
      this.editProject();
    }
    else {
      this.saveNewProject();
    }
  }

  saveNewProject(): void {
    let newId = this.getId();

    let newProject: IProject = {
      id: 0,
      name: "",
      created: new Date()
    };
    newProject.id = newId;
    newProject.name = this.project.name;
    newProject.created = new Date();

    this.store.dispatch(createProject({ newProject: newProject }));

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        
        
        this.store.dispatch(loadProjects());
        this.closePopup();
        this.clearProject();
        this.emptyEditProject.id = 0;
      }
    });
  }

  clearProject(): void {
    this.project.id = 0;
    this.project.name = "";
    this.project.created = new Date();

    // this.emptyProject.id = 0;
    // this.emptyProject.name = "";
    // this.emptyProject.created = new Date();
  }

  getId(): number {
    let id = Math.max(...this.projects.map(p => p.id));
    return ++id;
  }

  openEditPopUp(id: number): void {
    let selectedProject = this.projects.filter(p => p.id === id)[0];
    
    this.emptyEditProject.id = selectedProject.id;
    this.project.name = selectedProject.name;
    this.openPopup('edit');
  }

  editProject(): void {
 
      let update: IProject;
      update = this.project;
      update.id = this.emptyEditProject.id;
      
      this.store.dispatch(
        updateProject({ updateProject: { ...update } })
      );
  
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((apState) => {
          if (apState.apiStatus == 'success') {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            
            this.closePopup();
            this.store.dispatch(loadProjects());
            this.clearProject();
            this.emptyEditProject.id = 0;
            // this.emptyProject.name = "";
            // this.emptyProject.created = new Date();
           
          }
        });
      
  }

  deleteProject(): void {
    let projectIdToDelete = this.deleteProjectId;

    this.store.dispatch(
      deleteProject({
        projectId: projectIdToDelete,
      })
    );

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
       
        this.store.dispatch(loadProjects());
        this.closeDeleteDialog();
        this.clearProject();
        this.deleteProjectId = 0;
      }
    });
  }
}

import { Action, createReducer, on } from '@ngrx/store';
import { IProject } from '../Models/project.model';
import { ProjectState } from './project-state.model';
import { createProjectSuccess, loadProjectsSuccess, updateProjectSuccess, deleteProjectSuccess } from './project.actions';

export const projectFeatureKey = 'myprojects';

export const initialState: ProjectState = {
  projects: []
};
// export const initialState: ReadonlyArray<IProject> = [];

export const projectReducer = createReducer(
  initialState,
  on(loadProjectsSuccess, (state, { projects }) => {
    return { projects };
  }),

  on(createProjectSuccess,  (state, { newProject }) => 
  ({ ...state, projects: [...state.projects, newProject] })),

  on(updateProjectSuccess, (state, { updateProject }) => {
    
    let newState: ProjectState = {
        projects: []
    }
    let updatedProject = state.projects.filter((_) => _.id != updateProject.id);
    updatedProject.unshift(updateProject);
    
    newState.projects = updatedProject;

    return newState;
  }),

  on(deleteProjectSuccess, (state, { projectId }) => {

    let newState: ProjectState = {
        projects: []
    }

    let projects = state.projects.filter((_) => _.id != projectId);
    newState.projects = projects;
    return newState;
  })
//   on(createProjectSuccess, (state, { project }) => ({ ...state, projects: [...state.projects, project] })),
//   on(updateProjectSuccess, (state, { project }) => {
//     const index = state.projects.findIndex(p => p.id === project.id);
//     return { ...state, projects: [...state.projects.slice(0, index), project, ...state.projects.slice(index + 1)] };
//   })
//   on(createProjectSuccess, (state, { project }) => {
//     const index = state.projects.findIndex(p => p.id === projectId);
//     return { ...state, projects: [...state.projects.slice(0, index), ...state.projects.slice(index + 1)] };
//   })
);

export function reducer(state: ProjectState | undefined, action: Action) {
  return projectReducer(state, action);
}

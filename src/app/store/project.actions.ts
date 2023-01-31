import { createAction, props } from '@ngrx/store';
import { IProject } from '../Models/project.model';

export const loadProjects = createAction('[Project] Load Projects');
export const loadProjectsSuccess = createAction('[Project] Load Projects Success', props<{ projects: IProject[] }>());

export const createProject = createAction('[Project] Create Project', props<{ newProject: IProject }>());
export const createProjectSuccess = createAction('[Project] Create Project Success', props<{ newProject: IProject }>());

export const updateProject = createAction('[Project] Update Project', props<{ updateProject: IProject }>());
export const updateProjectSuccess = createAction('[Project] Update Project Success', props<{ updateProject: IProject }>());

export const deleteProject = createAction('[Project] Delete Project', props<{ projectId: number }>());

export const deleteProjectSuccess = createAction('[Project] Delete Project', props<{ projectId: number }>());

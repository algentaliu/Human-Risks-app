import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProject } from '../Models/project.model';
 
export const selectProjects = createFeatureSelector<IProject[]>('myProjects');

export const selectBookById = (id: number) =>
  createSelector(selectProjects, (projects: IProject[]) => {
    var projectById = projects.filter((_) => _.id == id);
    if (projectById.length == 0) {
      return null;
    }
    return projectById[0];
  });
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { select, Store } from '@ngrx/store';

import { loadProjects,
    loadProjectsSuccess,
    createProject,
    createProjectSuccess,
    updateProject,
    updateProjectSuccess,
    deleteProject,
    deleteProjectSuccess } from './project.actions';
import { selectProjects } from './project.selector';
import * as ProjectActions from './project.actions'
import { Appstate } from './app-store/appstate';
import { setAPIStatus } from './app-store/app.action';

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private _projectsService: ProjectService,
        private store: Store,
        private appStore: Store<Appstate>
      ) {}

      loadAllProjects$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadProjects),
        withLatestFrom(this.store.pipe(select(selectProjects))),
        mergeMap(([, projectformStore]) => {
        //   if (projectformStore.length > 0) {
        //     return EMPTY;
        //   }
          return this._projectsService
          .getProjects()
          .pipe(map(data => 
          loadProjectsSuccess({ projects: data })
          ));
        })
      )
    );

    createNewProject$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(createProject),
          switchMap((action: any) => {
            
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            
            return this._projectsService.createProject(action.newProject).pipe(
              map((data) => {
                this.appStore.dispatch(
                  setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                  })
                );
                return createProjectSuccess({ newProject: data });
              })
            );
          })
        );
      });

      updateProject$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(updateProject),
          switchMap((action) => {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            
            return this._projectsService.updateProject(action.updateProject).pipe(
              map((data) => {
                this.appStore.dispatch(
                  setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                  })
                );
                
                return updateProjectSuccess({ updateProject: data });
              })
            );
          })
        );
      });

      deleteProject$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(deleteProject),
          switchMap((actions) => {
            this.appStore.dispatch(
              setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
            );
            return this._projectsService.deleteProject(actions.projectId).pipe(
              map(() => {
                this.appStore.dispatch(
                  setAPIStatus({
                    apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                  })
                );
                return deleteProjectSuccess({ projectId: actions.projectId });
              })
            );
          })
        );
      });
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects/projects.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectEffects } from '../store/project.effects';

import * as projectsReducer from '../store/project.reducer';
import { FormsModule } from '@angular/forms';
// import { projectReducer } from '../store/project.reducer'


@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    // StoreModule.forRoot({}),
    StoreModule.forFeature(projectsReducer.projectFeatureKey, projectsReducer.projectReducer),

    EffectsModule.forFeature([ProjectEffects])
  ],
  providers: [ProjectEffects]
})
export class ProjectsModule { }

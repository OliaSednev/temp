import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { NgSwitchCaseComponent } from './ng-switch-case/ng-switch-case.component';
import { NgForComponent } from './ng-for/ng-for.component';
import { NgForAndTrackByComponent } from './ng-for-and-track-by/ng-for-and-track-by.component';
import { NgClassComponent } from './ng-class/ng-class.component';
import { BootstrapPanelComponent } from './bootstrap-panel/bootstrap-panel.component';
import { NgContainerComponent } from './ng-container/ng-container.component';
import { InputFormatDirective } from './input-format.directive';
import { ZippyComponent } from './zippy/zippy.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    NgSwitchCaseComponent,
    NgForComponent,
    NgForAndTrackByComponent,
    NgClassComponent,
    BootstrapPanelComponent,
    NgContainerComponent,
    InputFormatDirective,
    ZippyComponent,
    NewCourseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

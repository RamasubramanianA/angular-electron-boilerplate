import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { NavlistComponent } from './components/navlist/navlist.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { TOCComponent } from './components/TOC/TOC.component';
import { LinkComponent } from './components/Yen/link/link.component';
import { ParaComponent } from './components/Yen/para/para.component';
import { PageWithDyComComponent } from './components/pageWithDyCom/pageWithDyCom.component';
import { DynCompDirHostDirective } from './directives/DynCompDirHost.directive';
import { GetDyCompService } from './services/renderer/getDyComp.service';
import { FileSystemsService } from './services/main/fileSystems.service';
import { IpcService } from './services/main/ipc.service';
import { IdeaComponent } from './components/Yen/idea/idea.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CodeHighlighterService } from './services/renderer/prism/codeHighlighter.service';
import { CodeComponent } from './components/Yen/code/code.component';
import { WordComponent } from './components/Yen/word/word.component';
import { UserPreferencesComponent } from './components/userPreferences/userPreferences.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './components/my-courses/course/course.component';
import { LayoutComponent } from './layout/layout.component';
import { LeftEndHoverDirective } from './directives/mouseHover/leftEndHover.directive';
import { SideNavService } from './services/renderer/sideNav/sideNav.service';

@NgModule({
   declarations: [
      AppComponent,
      Component1Component,
      Component2Component,
      TOCComponent,
      NavlistComponent,
      MyCoursesComponent,
      LinkComponent,
      ParaComponent,
      IdeaComponent,
      PageWithDyComComponent,
      DynCompDirHostDirective,
      CodeComponent,
      WordComponent,
      UserPreferencesComponent,
      CourseComponent,
      LayoutComponent,
      LeftEndHoverDirective
   ],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
      MatIconModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [
      GetDyCompService,
      FileSystemsService,
      IpcService,
      CodeHighlighterService,
      SideNavService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      LinkComponent,
      ParaComponent,
      IdeaComponent
   ],
   exports: [
      MyCoursesComponent
   ]
})
export class AppModule { 

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}

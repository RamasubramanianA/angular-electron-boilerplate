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
import { ListComponent } from './components/courses/list/list.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { Ex1Component } from './components/courses/ex1/ex1.component';
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

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    TOCComponent,
    NavlistComponent,
    ListComponent,
    MyCoursesComponent,
    Ex1Component,
    LinkComponent,
    ParaComponent,
    IdeaComponent,
    PageWithDyComComponent,
    DynCompDirHostDirective,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    HttpClientModule 
  ],
  providers: [GetDyCompService,
              FileSystemsService, 
              IpcService,
              CodeHighlighterService            
            ],
  bootstrap: [AppComponent],
  entryComponents: [ LinkComponent, ParaComponent, IdeaComponent  ],
  exports:[MyCoursesComponent]
})
export class AppModule { 

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}

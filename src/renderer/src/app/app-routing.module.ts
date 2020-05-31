import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CommonModule } from '@angular/common';
import { UserPreferencesComponent } from './components/userPreferences/userPreferences.component';
import { TOCComponent } from './components/TOC/TOC.component';


const routes: Routes = [
  { path:  '', component:  Component1Component },
  { path:  '2', component:  TOCComponent },
  { path:  '3', component:  MyCoursesComponent } ,
  { path:  '4', component:  UserPreferencesComponent } 

//  { path: '404', component: NotfoundComponent },
//  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

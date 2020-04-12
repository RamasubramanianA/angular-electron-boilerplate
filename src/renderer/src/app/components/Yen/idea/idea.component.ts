import { Component, OnInit, Input } from '@angular/core';
import { ideaData, alertClasses } from 'src/app/dataPattern/componentData/idea';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';



@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit, DynamicComponentInterface {
  @Input() data:ideaData;

  alertClasses = new alertClasses();
  
  constructor() { 
    console.log('data: ', this.data);  
    console.log('alertClasses: ', this.alertClasses.danger);  
  }
  ngOnInit() {
  }

}

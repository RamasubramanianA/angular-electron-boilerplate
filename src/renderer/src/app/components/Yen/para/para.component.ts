import { Component, OnInit, Input } from '@angular/core';
import { paraData } from 'src/app/dataPattern/componentData/para';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.css']
})
export class ParaComponent implements OnInit, DynamicComponentInterface {
  @Input() data: paraData;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}

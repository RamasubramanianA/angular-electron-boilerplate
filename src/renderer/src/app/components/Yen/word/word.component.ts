import { Component, OnInit, Input } from '@angular/core';
import { wordData } from 'src/app/dataPattern/componentData/word';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit , DynamicComponentInterface{
  @Input() data: wordData;

  constructor() { }

  ngOnInit() {
  }

}

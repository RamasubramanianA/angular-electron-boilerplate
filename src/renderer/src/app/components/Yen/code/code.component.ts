import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { CodeHighlighterService } from 'src/app/services/renderer/prism/codeHighlighter.service';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';
import { codeData } from 'src/app/dataPattern/componentData/code';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewChecked, DynamicComponentInterface {
  @Input() data: codeData ;

  highlighted: boolean = false;
  content: string = String.raw`#include <stdio.h>

  int main()
  {
    int a = 4 , b = 8 , c = 1 , d = 1 ;
  
    printf( "Addition: %d \n" , a + b ) ;
    printf( "Subtraction: %d \n" , b - a ) ;
    printf( "Multiplication: %d \n" , a * b ) ;
    printf( "Division: %d \n" , b / a ) ;
    printf( "Modulus: %d \n" , a % b ) ;
  
    printf( "Postfix increment: %d \n" , c++ ) ;
    printf( "Postfix now: %d \n" , c ) ;
    printf( "Prefix increment: %d \n" , ++d ) ;
    printf( "Prefix now: %d \n" , d ) ;
  
    return 0 ;
  }   
`;
  constructor(private codeHighlighter: CodeHighlighterService) { }

  ngOnInit(  ) {
  }

  ngAfterViewChecked() {
    if ( !this.highlighted) {
      this.codeHighlighter.highlightAll();
      this.highlighted = true;
    }
  }

}

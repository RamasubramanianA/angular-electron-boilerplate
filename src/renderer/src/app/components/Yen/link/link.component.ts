import { Component, OnInit, Input } from '@angular/core';
import { linkData } from 'src/app/dataPattern/componentData/link';
import { DynamicComponentInterface } from 'src/app/interface/DynamicComponentInterface';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit, DynamicComponentInterface {
  @Input() data: linkData ;
  open: boolean = false;
  constructor() { }
  
  ngOnInit() {
    console.log('data: ', this.data);
    // this.animate();
  }

  goTo(){
    console.log("Goto.");
  }

  // animate(){
  //   let element =  document.querySelector('.animated_pulse');
  //   element.classList.add('animated', 'pulse' , 'delay-4s');

  //   element.addEventListener('animationend', function() { 
  //     console.log('animationend: ');
  //     element.classList.remove('animated', 'pulse' , 'delay-4s');
  //     element =  document.querySelector('.animated_pulse');
  //     element.classList.add('animated', 'pulse' , 'delay-4s');
  //   });
  // }

}

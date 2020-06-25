import { Component, OnInit, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { CourseDetails } from '../../../../../../common/interface/courseDetails';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input('course') course: CourseDetails;
  open: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    console.log(this.elRef.nativeElement);
    console.log(this.renderer);
  }

  ngOnInit() {
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event) {
    console.log('event: ', event);
    console.log('event.target.localName : ', event.target.localName);

    if (event.target.localName === 'mat-card') {
      this.open = true;
    }

  }
  //  this.renderer.setAttribute(this.elRef.nativeElement, 'value', 'Enter a Value');


  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    //  this.renderer.removeAttribute(this.elRef.nativeElement, 'value');
    console.log('leave', event);
    if (event.target.localName === 'app-course' ) {
      this.open = false;
    }
  }

  goTo() {
    console.log("Goto.");
    this.open = true;
  }

}

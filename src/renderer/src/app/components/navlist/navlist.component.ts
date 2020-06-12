import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  @Input() courseAvailablity: CourseAvailability;
  constructor() { }

  ngOnInit() {
    console.log("courseAvailablity", this.courseAvailablity);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}

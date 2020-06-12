import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseListService } from 'src/app/services/main/courseList.service';
import { HomeScreenAlertService } from 'src/app/services/renderer/homeScreenAlert.service';
import { Subscription } from 'rxjs';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';
import { CourseDetails } from '../../../../../common/interface/courseDetails';
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
  
})
export class MyCoursesComponent implements OnInit {

  CourseDetails: CourseDetails[];

  constructor( private courseListService: CourseListService , 
    private homeScreenAlertService :HomeScreenAlertService) { 
      courseListService.getCourseDetails().then(courses =>{
        console.log('courses: ', courses);
        this.CourseDetails = courses;
      }).catch( () => console.log('error'));
    }
  
  ngOnInit() { }

}

import { Injectable } from '@angular/core';
import { CourseDetails } from "./../../../../../common/interface/courseDetails";
import { HomeScreenAlertService } from '../renderer/homeScreenAlert.service';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {

  constructor(private homeScreenAlertService: HomeScreenAlertService) {

  }


  async getCourseDetails(): Promise<CourseDetails[]> {
    console.log('getCourseDetails serivce: ');

    let localLibraryPath: string = this.homeScreenAlertService.getlocalLibraryPathFromService();
    console.log('localLibraryPath: ', localLibraryPath);
    if (localLibraryPath) {
      return this.courseDetailsHelper(localLibraryPath, false);
    } else {
      return this.courseDetailsHelper('', true);
    }
  }

  private courseDetailsHelper(path: string, shouldReject: boolean): Promise<CourseDetails[]> {

    return new Promise((resolve, reject) => {
      if (shouldReject)
        reject();
      else {
        console.log('inside getCourseDetailsHelper service. ');
        window.api.electronIpcOnce('course-details', (event, arg) => {
          const courseDetails: CourseDetails[] = arg;
          console.log('arg getCourseDetails: ', arg);
          resolve(courseDetails);
        });
        window.api.electronIpcSend('request-course-details', path);
        console.log('after send. ');
      }
    });
  }
}

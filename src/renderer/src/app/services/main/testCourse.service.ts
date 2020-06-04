import { Injectable } from '@angular/core';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';

@Injectable({
  providedIn: 'root'
})
export class TestCourseService {

constructor() {

 }

 getTestForTheMinimumCourseAvailable(baseDirectory : string ): Promise<CourseAvailability> {
    return new Promise((resolve, reject) => {
      window.api.electronIpcOnce('courseAvailablity', (event, arg) => {
        console.log(' courseAvailablity arg: ', arg);
        const courseAvailablity : CourseAvailability =  arg;
        resolve(courseAvailablity);
      });
      window.api.electronIpcSend('getTestForTheMinimumCourseAvailable', baseDirectory);
    });
  }

}

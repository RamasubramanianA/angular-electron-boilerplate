import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';
import { YenBookDB } from 'src/app/dataPattern/indexedDbModels/YenBookDB';
import { TestCourseService } from '../main/testCourse.service';

@Injectable({
  providedIn: 'root'
})
export class HomeScreenAlertService {
  
  constructor( private testCourseService: TestCourseService) { 

    this.getlocalLibraryPath().then(path=>{
      this.testCourseService.getTestForTheMinimumCourseAvailable( path).then(val=>{
        this.homeScreenAlertSubject$.next(val);
      });
    })
  }


  private homeScreenAlertSubject$ = new Subject<CourseAvailability>();

  sendMessage(courseAvailability: CourseAvailability) {
    this.homeScreenAlertSubject$.next(courseAvailability);
  }

  clearMessages() {
    this.homeScreenAlertSubject$.next();
  }

  getMessage(): Observable<CourseAvailability> {
    return this.homeScreenAlertSubject$.asObservable();
  }

  async getlocalLibraryPath(): Promise<string> {
    return new Promise(async (resolve)=>{
      let db = new YenBookDB();
      let localLibraryPath = db.preference.get('localLibraryPath');
      await localLibraryPath.then(val => {
        console.log('val: ', val.value);
        resolve( val.value);
      }).catch((err) => {
        console.log('err: ', err);
        resolve( 'error');
      });
      resolve ('No result');

    });
  }


}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CourseAvailability } from '../../../../../common/interface/courseAvailability';
import { YenBookDB } from 'src/app/dataPattern/indexedDbModels/YenBookDB';
import { TestCourseService } from '../main/testCourse.service';

// return localLibraryPath from indexed DB
// prepare alert message for course availability
@Injectable({
  providedIn: 'root'
})
export class HomeScreenAlertService {
  private localLibraryPath: string; 
  
  constructor( private testCourseService: TestCourseService) { 

   this.validateFolder();
    
  }


  private homeScreenAlertSubject$ = new Subject<CourseAvailability>();

  sendMessage(courseAvailability: CourseAvailability) {
    console.log('courseAvailability: ', courseAvailability);
    this.homeScreenAlertSubject$.next(courseAvailability);
  }

  clearMessages() {
    this.homeScreenAlertSubject$.next();
  }

  getMessage(): Observable<CourseAvailability> {
    console.log("getMessage()");
    return this.homeScreenAlertSubject$.asObservable();
  }

  getlocalLibraryPathFromService(): string{
    return this.localLibraryPath;
  }

  async getlocalLibraryPath(): Promise<string> {
    return new Promise(async (resolve)=>{
      let db = new YenBookDB();
      let localLibraryPath = db.preference.get('localLibraryPath');
      await localLibraryPath.then(val => {
        console.log('val: ', val.value);
        this.localLibraryPath = val.value;
        resolve( val.value);
      }).catch((err) => {
        console.log('err: ', err);
        resolve( 'error');
      });
      resolve ('No result');
    });
  }


  validateFolder() {
    this.getlocalLibraryPath().then(path=>{
      this.testCourseService.getTestForTheMinimumCourseAvailable( path).then(val=>{
        this.homeScreenAlertSubject$.next(val);
      });
    });
  }

}

import { Component } from '@angular/core';
import { IpcService } from './../../src/app/services/main/ipc.service';
import { HomeScreenAlertService } from './services/renderer/homeScreenAlert.service';
import { Subscription, interval } from 'rxjs';
import { CourseAvailability } from '../../../common/interface/courseAvailability';
import { map,take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subscription: Subscription;

  title = 'YenBook';
  courseAvailability: CourseAvailability;
  
  constructor(private ipcService: IpcService,
     private homeScreenAlertService: HomeScreenAlertService) {
      this.subscription = this.homeScreenAlertService.getMessage().subscribe( availability =>{
        if(availability){
          this.courseAvailability = availability;
        } else {
          this.courseAvailability = undefined;
        }
      });

      interval(1000)
      .pipe(
        take(3),
        map(v => Date.now())
      )
      .subscribe(value => console.log("Subscriber: " + value));
  }
  
  clearAlert(){
    this.homeScreenAlertService.clearMessages();
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { IpcService } from './../../src/app/services/main/ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-electron-boilerplate';

  constructor(private ipcService: IpcService) {
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}

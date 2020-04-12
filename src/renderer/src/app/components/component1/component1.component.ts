import { Component, OnInit, NgZone } from '@angular/core';
import { IpcService } from 'src/app/services/main/ipc.service';
import { linkData } from 'src/app/dataPattern/componentData/link';
import { paraData } from 'src/app/dataPattern/componentData/para';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  arch = '-';
  hostname = '-';
  platform = '-';
  release = '-';
  data: linkData = {external: false,
  title: 'C program wiki link',
 url: 'www.cProgramwiki.com'} 

 dataPara: paraData = {
   para: `New paragpaph.
   
   
   two new line adeded.`
 }
  constructor(private ipcService: IpcService, private ngZone: NgZone) { }

  ngOnInit() {
    this.ipcService.getSystemInfoAsync()
      .then(systemInfo => {
        this.ngZone.run(() => {
          this.arch = systemInfo.Arch;
          this.hostname = systemInfo.Hostname;
          this.platform = systemInfo.Platform;
          this.release = systemInfo.Release;
          });
      });
  }
}

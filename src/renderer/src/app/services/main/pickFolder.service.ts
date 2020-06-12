import { Injectable } from '@angular/core';

// Windows Folder picker Dialog will open and get value
@Injectable({
  providedIn: 'root'
})
export class PickFolderService {

constructor() { }
getFolderName(): Promise<string> {
  return new Promise((resolve, reject) => {
    window.api.electronIpcOnce('folderName', (event, arg) => {
      const folderName: string = arg;
      console.log('folderName: ', folderName);
      resolve(folderName);
    });
    window.api.electronIpcSend('request-folderName');
  });
}

}

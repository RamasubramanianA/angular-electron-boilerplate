import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemsService {

constructor() { }

getFilesInDirAsync(): Promise<string[]> {
  console.log('getFilesInDirAsync: ');
  return new Promise((resolve, reject) => {
    console.log('inside ');
    window.api.electronIpcOnce('files-in-dir', (event, arg) => {
      const fileList : string[] = arg;
      console.log('arg: ', arg);
      resolve(fileList);
    });
    window.api.electronIpcSend('request-file-list');
    console.log('after send. ');
  });
}

getFileContentAsync( fileName ): Promise<string> {
  console.log('fileName: ', fileName);

  return new Promise((resolve, reject) => {
    window.api.electronIpcOnce('file-content', (event, arg) => {
      const fileContent : string = arg;
      console.log('arg: ', fileContent);
      resolve(fileContent);
    });
    window.api.electronIpcSend('request-file-content', fileName);
    console.log('after send. ');
  });
}

}

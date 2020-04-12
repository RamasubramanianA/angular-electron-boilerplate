import { Component, OnInit } from '@angular/core';
import { FileSystemsService  } from "./.././../services/main/fileSystems.service"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
  
})
export class MyCoursesComponent implements OnInit {

  files: string[] = [];
  content: string = '';
  
  constructor(
    private fileSystem: FileSystemsService,
    private router:Router
  ) { 

    console.log('ll');
  
  }
  
  ngOnInit() {
    this.fileSystem.getFilesInDirAsync().then(files =>{
      console.log('files: ', files);
      this.files = files;
    });
  }

  openCourse( file){
    console.log('file: ', file);
    this.fileSystem.getFileContentAsync(file).then( content =>{
      this.content = content;
      console.log(content);
      this.router.navigateByUrl(`cPara/${content}`);
    });
  }

}

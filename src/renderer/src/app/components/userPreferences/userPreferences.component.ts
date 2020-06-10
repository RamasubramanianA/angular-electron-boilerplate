import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import Dexie from 'dexie';
import { PickFolderService } from './../../services/main/pickFolder.service'
import { YenBookDB } from 'src/app/dataPattern/indexedDbModels/YenBookDB';
import { CourseAvailability } from "../../../../../common/interface/courseAvailability";
import { TestCourseService } from 'src/app/services/main/testCourse.service';
import { HomeScreenAlertService } from 'src/app/services/renderer/homeScreenAlert.service';
@Component({
  selector: 'app-userPreferences',
  templateUrl: './userPreferences.component.html',
  styleUrls: ['./userPreferences.component.css']
})
export class UserPreferencesComponent implements OnInit {
  folder: string;
  folderControl = new FormControl('', Validators.required);
  FormGroupOptions: FormGroup;
  courseAvailability: CourseAvailability;
  constructor(private pickFolderService: PickFolderService,
    private fb: FormBuilder,
    private testCourseService: TestCourseService,
    private homeScreenAlertService : HomeScreenAlertService
  ) {
    this.FormGroupOptions = fb.group({
      folder: this.folderControl
    });

  }

  ngOnInit() {
    this.setLocalLibraryPath();
  }

  setLocalLibraryPath() {    
      this.homeScreenAlertService.getlocalLibraryPath().then(path =>{
        this.folderControl.setValue(path);
      }).then(()=>{
        this.testCourseFolder();      
      });
  }

  testCourseFolder() {
    console.log('this.folderControl.value: ', this.folderControl.value);
    this.testCourseService.getTestForTheMinimumCourseAvailable(this.folderControl.value).then(val => {
      this.courseAvailability = val;
      this.homeScreenAlertService.sendMessage(val);
    });
  }

  async getFolderName() {
    const databases = await Dexie.getDatabaseNames();
    console.log(databases);
    this.pickFolderService.getFolderName().then(val => {

      if (val !== undefined) {
        this.folderControl.setValue(val);
        console.log('val: ', val);
        let db = new YenBookDB();
        db.preference.put({
          key: 'localLibraryPath',
          value: val
        });
        this.testCourseFolder();
      }
    });
  };

  // testFolder() {
  //   this.testCourseFolder();
    // swal({
    //   title: 'Folder have courses',
    //   timer: 1500,
    //   position: 'top-end',
    //   type: "success",
    //   showConfirmButton: false
    // });
  // }
}


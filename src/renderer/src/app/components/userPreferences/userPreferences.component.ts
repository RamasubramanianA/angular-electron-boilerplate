import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import Dexie from 'dexie';
import { PickFolderService } from './../../services/main/pickFolder.service'
import { YenBookDB } from 'src/app/dataPattern/indexedDbModels/YenBookDB';

@Component({
  selector: 'app-userPreferences',
  templateUrl: './userPreferences.component.html',
  styleUrls: ['./userPreferences.component.css']
})
export class UserPreferencesComponent implements OnInit {
  folder: string;
  folderControl = new FormControl('', Validators.required);
  FormGroupOptions: FormGroup;
  constructor(private pickFolderService: PickFolderService,
    private fb: FormBuilder
  ) {

    this.FormGroupOptions = fb.group({
      folder: this.folderControl
    });
  }

  ngOnInit() {
    this.setLocalLibraryPath();
  }

  setLocalLibraryPath(){
    let db = new YenBookDB();
    let localLibraryPath = db.preference.get('localLibraryPath');
    localLibraryPath.then(val =>{
      console.log('val: ', val.value);
      this.folderControl.setValue( val.value);
    }).catch((err)=>{
      console.log('err: ', err);
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
      }
    });
  };

  testFolder() {
    swal({
      title: 'Folder have courses',
      timer: 1500,
      position: 'top-end',
      type: "success",
      showConfirmButton: false
    });
  }
}


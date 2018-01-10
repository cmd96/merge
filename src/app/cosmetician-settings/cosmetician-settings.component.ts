import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {DatabaseFirebaseService} from '../database-firebase.service'
import * as firebase from 'firebase';






@Component({
  selector: 'app-cosmetician-settings',
  templateUrl: './cosmetician-settings.component.html',
  styleUrls: ['./cosmetician-settings.component.scss']
})



export class CosmeticianSettingsComponent implements OnInit {

  constructor(public databaseFirebase: DatabaseFirebaseService ) {
    }
    ngOnInit() {
    }
     public addProducts(){
      this.databaseFirebase.addProducts();
    }
     public addTreatment(){
      this.databaseFirebase.addTreatment();
    }
     public addLocation(){
      this.databaseFirebase.addLocation();
    }
     public addCustomer()
    {
      this.databaseFirebase.addCustomer();  
    }
    public addCosmetician(){
      this.databaseFirebase.addCosmetician();
    }
    public addMessageManager(){
      this.databaseFirebase.addMessageManager();
    }
    public addSettingDay(){
      this.databaseFirebase.addSettingDay();
    }
    
    public addAppointment(){
      this.databaseFirebase.addAppointment();
    }  
    public addSettingDay(){
      this.databaseFirebase.addSettingDay()
    }

public uploadImage(image, options) {
  let res=this.databaseFirebase.uploadImage(image, options);
}
}

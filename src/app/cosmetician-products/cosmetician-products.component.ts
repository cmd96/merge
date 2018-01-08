import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {DatabaseFirebaseService} from '../database-firebase.service'
@Component({
  selector: 'app-cosmetician-products',
  templateUrl: './cosmetician-products.component.html',
  styleUrls: ['./cosmetician-products.component.scss']
})
export class CosmeticianProductsComponent implements OnInit {

  
  
  
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
public addAppointment(){
  this.databaseFirebase.addAppointment();
}

public uploadImage(image, options) {
  let res=this.databaseFirebase.uploadImage(image, options);
}
}

import { Component, OnInit } from '@angular/core';
import { DatabaseFirebaseService } from '../database-firebase.service';
import { Router } from "@angular/router";
import{AuthService} from '../auth.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  constructor(public databaseFirebase: DatabaseFirebaseService, private router: Router,public auth:AuthService) {
  }
  ngOnInit() {
  }
  public addCustomer() {
    if (this.databaseFirebase.IsNotEmpty()) {
      this.databaseFirebase.addCustomer();

      
       this.auth.current_user.address = this.databaseFirebase.customerAddress;
       this.auth.current_user.first_name  = this.databaseFirebase.customerFirstName;
       this.auth.current_user.last_name   = this.databaseFirebase.customerLastName;
       this.auth.current_user.email       = this.databaseFirebase.customerId;
       this.auth.current_user.is_customer = this.databaseFirebase.customer_rank;
       this.auth.current_user.phone       = this.databaseFirebase.customerPhone;
      
      this.auth.isLogin=true;
      this.router.navigate(["home"]);
    }
  }
}

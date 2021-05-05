import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthserviceService } from '../shared/authservice.service';
import { DbserviceService } from '../shared/dbservice.service';
import { UserDetails } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails = new UserDetails('','','','','');
  baseURL : string ="https://my-json-server.typicode.com/joeljoyston/lms";

  constructor(private auth : AuthserviceService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadUserData();

  }

  onSubmit(loginForm : NgForm){
    console.log(loginForm.value.userName);
    const userName = loginForm.value.userName;
    const password = loginForm.value.password;
    const url = this.baseURL + "/users?userName=" +userName + "&password=" + password;
    this.auth.validateCredential(url).subscribe(userData => {
      console.log("User Data: " + userData)
      console.log(this.userDetails);
      console.log("User Name in Login Component :" + this.auth.userName);
      console.log("User type" + this.auth.user.userType);
      if(this.auth.user.userType==='admin')
        this.router.navigate(['/addBook']);
      else  
      this.router.navigate(['/borrow']);
    });
    
    
      
  }

  private loadUserData() {
    this.auth.loggedInUser.subscribe(
      userData =>{
      console.log("Inside Load User Data" + userData);
      this.userDetails = userData;
    });
  }
}

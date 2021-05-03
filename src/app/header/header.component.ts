import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../shared/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSub= new Subscription();
  userName : string ='';
  userType : string ='';

  constructor(private authService:AuthserviceService,
              private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.loggedInUser.subscribe(user=> {
      this.isLoggedIn = !!user;
      this.userName = user.firstName;
      this.userType = user.userType;
      console.log(this.userName);
    });
    
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logOut(){
    this.userSub.unsubscribe();
    this.isLoggedIn=false;
    this.userName='';
    this.router.navigate(['/']);
  }

}

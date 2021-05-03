import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserDetails } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements OnDestroy {

  loggedInUser = new Subject<UserDetails>();
  userDetails : UserDetails[] =[];
  user = new UserDetails('','','','','');
  userName : string='';

  
  constructor(private http:HttpClient
              ) { }

  validateCredential(url:string){
    return this.http.get<UserDetails[]>(url)
      .pipe(        
        tap(responseData => {
          for (const key in responseData) {
            this.userDetails.push(responseData[key]);
          }
          this.user = new UserDetails(this.userDetails[0].userName,
            this.userDetails[0].firstName,
            this.userDetails[0].lastName,
            this.userDetails[0].password,
            this.userDetails[0].userType);
          
          this.userName = this.user.userName;
          console.log("Hi from Auth Service" + this.userName);
          this.loggedInUser.next(this.user);
        }
      
      ));
    
  }
  
  ngOnDestroy(){
    this.loggedInUser.unsubscribe();
  }


}

import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private auth : AuthserviceService,
              private router : Router) { 
                console.log("Hi from Auth Guard Service");
              }

  canActivate(
    route : ActivatedRouteSnapshot, 
    router: RouterStateSnapshot) : |
    boolean | 
    UrlTree | 
    Promise<boolean | UrlTree> |
    Observable<boolean | UrlTree> {
      console.log("Hi from CanActivate");
      
      return this.auth.loggedInUser.pipe(     
        take(1),
        map(user => {
          const isAuth =!!user;
          console.log("Inside pipe of canactivate" + isAuth);
          if(isAuth) {
            return true;
          }     
          return this.router.createUrlTree(['/login']);
        })
      );

   }
  }



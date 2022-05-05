import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './UserService';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) :Promise<boolean> {
    //this.router.navigate(['/'])
    return new Promise((resolve, reject) => {
    if(this.userService.getToken())
    resolve(true);
    else{
      this.router.navigate(['/login'])
        resolve(false);
    }
/*
      this.userService.getUser().then((la:any)=>{
      console.log("auth "+la)
      if(la){
        resolve(true);
      }else{
        this.userService.logOut()
        this.router.navigate(['/'])
        resolve(false);
      }
    })*/
    //end of verify
  })
  //end of canActivate
  
  }
}
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from './services/UserService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LungTrackerWeb';

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(private router: Router, private userService: UserService){

  }

  printSomething() {
    console.log("hi");
  }

  getToken(){
    return this.userService.getToken()
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['/home']);
  }

  goToForm() {
    this.router.navigate(['/form']);
    this.drawer.toggle()
  }
  goToLoginInvestigadores(){
    if(this.getToken()){
      this.router.navigate(['/researcher']);
    }else{
      this.router.navigate(['/login']);
    }
    this.drawer.toggle()
  }

  goToLoginButton(){
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}


import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LungTrackerWeb';

  @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;

  constructor(private router: Router){

  }

  printSomething() {
    console.log("hi");
  }

  goToForm() {
    this.router.navigate(['/form']);
    this.drawer.toggle()
  }
  goToLoginInvestigadores(){
    this.router.navigate(['/login']);
    this.drawer.toggle()
  }

  goToLoginButton(){
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}


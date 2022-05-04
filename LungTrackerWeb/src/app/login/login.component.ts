import {  Component, OnInit } from '@angular/core';
import { UserService } from "../services/UserService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string ="";
  password: string="";

  constructor(public userService : UserService, private router: Router) {}

  ngOnInit(): void {
  }

  login() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.userService.login(user).subscribe((res: any)=>{
      console.log(res)
      this.userService.setToken(res.token);
      this.router.navigateByUrl('/researcher');
    })

  }
}

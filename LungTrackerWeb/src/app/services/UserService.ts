import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  
 
  constructor(private http: HttpClient, private cookies: CookieService) {}


  login(user: any): any{
    return this.http.post("http://localhost:3000/auth", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  logOut() {
    this.cookies.delete("token");
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUserLogged() {
    const token = this.getToken();
    console.log(token)
    // Aquí iría el endpoint para devolver el usuario para un token
    //return this.http.get("http://localhost:3000/user");
  }
  getTableData() {
    return this.http.get("http://localhost:3000/persons", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }

  getLocalitzation() {
    return this.http.get("http://localhost:3000/livingPlaces?count=true", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }
  getUser(){
    if(this.getToken()){
      return this.getToken();
    }
    return undefined;
  }
}
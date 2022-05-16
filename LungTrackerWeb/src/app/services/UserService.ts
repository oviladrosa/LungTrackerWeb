import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  
 
  constructor(private http: HttpClient, private cookies: CookieService) {}


  login(user: any): any{
    return this.http.post("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/auth", user);
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
    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/persons", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }

  downloadFile(data) {
    const blob = new Blob([data], { type: 'text/json' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  getMutationTypes(){

    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/tumors/mutationTypes", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }

  getExpositionsClassified(){
    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/expositions/classified", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }

  getLocalitzation() {
    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/livingPlaces?count=true", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }

  getAgeRanges() {
    return this.http.get("https://young-hollows-40979.herokuapp.com/https://apiclinic.herokuapp.com/persons/ageRanges", {headers: new HttpHeaders().set('Authorization', this.getToken())});
  }
  getUser(){
    if(this.getToken()){
      return this.getToken();
    }
    return undefined;
  }
}
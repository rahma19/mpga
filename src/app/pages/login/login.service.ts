import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private router: Router) { }



  public ValidateUser(User: any) {
    return this.http.post('http://localhost:44372/api/UserRepo/LogInUser', User)
      .pipe(
        map(res => res),
      );
  }
//getToken
  getToken() {
    return localStorage.getItem('userToken');
  }
  url(){
    let href= this.router.url;
    return href;
  }

  stroreId(id: any) {
    localStorage.setItem("user", id);
  }
  storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  // public isAuthenticated(): boolean {
  //   return this.getToken() != null;
  // }
  storeRoles(roles: any) {
    localStorage.setItem("roles", roles);
  }
  removeRoles() {
    return localStorage.removeItem("roles");
  }
  removeToken() {
    return localStorage.removeItem("token");
  }
  removeId() {
    //console.log(localStorage.getItem("user"))
    return localStorage.removeItem("user");
  }
  getRoles() {
    return localStorage.getItem("roles");
  }
 
  getId() {
    return localStorage.getItem("user");
  }
  async Id() {
    return this.http.get('http://localhost:44372/api/UserRepo/LogOutUser?id=' + localStorage.getItem("user")).subscribe(async res => await console.log(res), err => { console.log(err) })
  }
  storeProfiles(profiles : any ) {
    localStorage.setItem("profiles", profiles);
  }
  getProfiles() {
    return localStorage.getItem("profiles");
  }
  removeProfiles() {
    return localStorage.removeItem("profiles");
  }
}

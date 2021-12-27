import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { AppconfigService } from 'app/pages/services/appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

// baseUrl:string="http://196.203.219.36:1222";

  constructor(private http:HttpClient, handler: HttpBackend,private appConfigService: AppconfigService) { this.http = new HttpClient(handler);}
  BaseUrl = this.appConfigService.authBaseUrl;
  BaseUrllogin = this.appConfigService.apiBaseUrl;
  userAuthentication(formData) {
   // localStorage.setItem('authen','1');
       // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  
    return this.http.post(this.BaseUrl+"/api/Login",formData);
  }
  LogoutSession(date){
    return this.http.post(this.BaseUrl+'/LogoutSessionFront',date);
  }
  LoginSession(model){
    return this.http.post(this.BaseUrllogin+'/LoginSessionFront',model)
  }
  
  // Authentification(userName,password){
  //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  //   return this.http.post("http://10.12.113.124:1001/api/Login",userName,password,);
  // }
 
}


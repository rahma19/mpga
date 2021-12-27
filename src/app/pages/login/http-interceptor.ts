import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
 import 'rxjs/add/operator/do';
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "selenium-webdriver/http";
import {LoginService} from './login.service';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private injector:Injector) { 
    }
    intercept(request: HttpRequest<any>, next: HttpHandler){
      let loginService = this.injector.get(LoginService)
 
     request= request.clone({
       setHeaders:{
         Authorization: `Bearer ${loginService.getToken()}`
       }

     })
     return next.handle(request)
     .do(
                      succ=>{},
                     err  => {
                          if (err.status === 401){
                          localStorage.removeItem('userToken')
                         console.log("Utilisateur déconnecté");
                              this.router.navigateByUrl('/login');
                          }
                        }
                      
                      );
                      
        // if (localStorage.getItem('userToken') != null) {
        //   ( err => {
        //     if (err.status === 401)
        //     localStorage.removeItem('userToken')
        //         this.router.navigateByUrl('/login');

        // });
        // return;
        // }
       
        
    }
  
}


// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   console.log('ici ici')
 
//     if (localStorage.getItem('userToken') != null) {
//       console.log('Token not null')
//       console.log(localStorage.getItem('userToken'))
//         const clonedreq = req.clone({
//             headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
//         });
//         return next.handle(clonedreq)
//             .do(
//             succ => { },
//             err => {
//                 if (err.status === 401)
//                 localStorage.removeItem('userToken')
//                     this.router.navigateByUrl('/login');
//             }
//             );
//     }
//     else {
//       console.log('Token null')
//         this.router.navigateByUrl('/login');
//     }
// }
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from "./login.service";
import { Location } from "@angular/common";

@Injectable({
    providedIn: 'root'
})

export class authGuardGuard implements CanActivate {

    constructor(public auth: LoginService, public router: Router, private location: Location, private authService: LoginService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):  boolean {
          if (localStorage.getItem('userToken') != null)
          
          return true;
          this.router.navigateByUrl('login');
          return false;
      }

    // canActivate(): boolean {
    //     if (!this.auth.isAuthenticated() && this.location.path() != '/login') {
    //         console.log('not Auth')  
    //         console.log('You are not authorised to view this page')
    //         this.authService.Id()
    //         this.router.navigateByUrl('login');
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    
    

}
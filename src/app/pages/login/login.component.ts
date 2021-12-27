import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/User.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{
    formModel = {
        UserName: '',
        Password: ''
      }
      
    msge : string ;
    alerts: any;
    filterform: FormGroup;


    isLoginError : boolean = false;
    loading = false;
    model={}
    trace:any
    constructor(private router: Router,private fb: FormBuilder, private userService: UserService,private toast: ToastrService) {
      
    }

    ngOnInit() {  
        this.filterform = this.fb.group({
            UserName:new FormControl('', Validators.compose([Validators.required])),
            Password:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\.])/)])),

        })
       // console.log(this.router.url);
       
    }

    onSubmit(form: NgForm){
        this.loading = true;
        this.userService.userAuthentication(form.value).subscribe((data : any)=>{
         //   console.log(data);
         this.loading = false;
     
       localStorage.setItem('userToken',data.access_token);
     

        this.router.navigateByUrl('pages');
        this.toast.success("Utilisateur connecté","", {timeOut: 2500}); 
        console.log(this.model)
        console.log(data.access_token)
//         this.userService.LoginSession(this.model).subscribe(res=>{
// this.trace=res
// console.log(this.trace)

//         })
    
       //this.router.navigate(['/pages']);
       },
       
       (err : HttpErrorResponse)=>{
        this.loading = false;
         //  console.log(err);
      //  this.toast.error("Nom d'utilisateur ou mot de passe incorrect")     

          this.isLoginError = true;
 
       })
       this.isLoginError = false;
      
    console.log( this.isLoginError)
     }

     
     
    
     


    // OnSubmit(form:NgForm){

    //     // this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
    //     //  localStorage.setItem('userToken',data.access_token);

    //     this.userService.userAuthentication(form.value).subscribe(
    //         (data:any)=>{
    //             localStorage.setItem('token',data.token);
    //             this.router.navigateByUrl('pages');
    //             this.toast.info("Utilisateur connecté") 
    //         },
    //         err=>{
    //             if(err.status==400){
    //                 this.toast.error("Nom d'utilisateur ou mot de passe incorrect");
    //             }
    //             else
    //             console.log(err);

    //         }
            
    //     )

    //     // console.log(data.access_token,userName,password);

    //     // this.router.navigateByUrl('pages');
    //     // this.toast.info("Utilisateur connecté") 
    
    //    //this.router.navigate(['/pages']);
    // //    },
    // //    (err : HttpErrorResponse)=>{
    // //   //  this.toast.error("Nom d'utilisateur ou mot de passe incorrect")     

    // //       this.isLoginError = true;
 
    // //    })
    // //    this.isLoginError = false;
       
    //  }

    // public onSubmit(values: Object): void {
    //     if (this.form.valid) {
    //         this.router.navigate(['pages/dashboard']);
    
    //     }
    // }

    //  Login(Form) {
    //     let user = {
    //         "motdepasse": [
    //             {
    //                 "mdp_password": Form.password
    //             }
    //         ],
    //         "use_login":Form.email
    //     }
    //     //console.log(user)
    //     this.isLoggedIn = false;
    //     this.authService.removeToken();
    //     this.alerts = [];
    //     this.authService.ValidateUser(user)
    //         .subscribe((result) => {
    //             this.globalResponse = result;
    //         },
    //             error => {//this is error part
    //                 this.loginValide=true;
    //                 if (error.status == 400) {
    //                         this.msge = "user connected" 
    //                 }else if (error.status == 306) {
    //                     this.msge = "user disabled"
    //                 }else if (error.status == 404) {
    //                     this.msge = "Mot de passe est incorrect"
    //                 }
    //                 else if (error.status == 406) {
    //                     this.msge = "veuillez saisir votre login et mot de passe"
    //                 } else {
    //                     this.msge = "Login n'existe pas"
    //                 }     
    //                 this.alerts.push({
    //                     id: 2,
    //                     type: 'danger',
    //                     message: this.msge
    //                 });
    //             },
    //             () => {
    //                 // this is the Success part 
    //                 //console.log(this.globalResponse);
    //                 this.authService.storeToken(this.globalResponse.Token);
    //                 this.authService.stroreId(this.globalResponse.id);
    //                 this.authService.storeRoles(this.globalResponse.roles);
    //                 this.authService.storeProfiles(this.globalResponse.profiles);
    //                 this.router.navigateByUrl('pages/dashboard');
    //                 this.alerts.push({
    //                     id: 1,
    //                     type: 'success',
    //                     message: 'Login successful.'
    //                 });
    //                 this.isLoggedIn = true;
    //             }
    //         )
    //  }
    

    // ngAfterViewInit() {
    //     document.getElementById('preloader').classList.add('hide');
    // }

}

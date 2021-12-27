import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, NgForm, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from 'app/pages/services/transaction.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordComponent implements OnInit {
  formModel = {
    mdp_last_password: '',
    mdp_New_password: '',
    confirmed_password: ''
  }
  filterform: FormGroup;
  hide= true;
  isLoginError : boolean = false;
  message: string;
  constructor(private transaction:TransactionService,private fb: FormBuilder,private toast: ToastrService) { }

  ngOnInit() {

    this.filterform = this.fb.group({
      mdp_last_password:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\.])/)])),
      mdp_New_password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\.])/)])),
      confirmed_password:new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\.])/)])),
     
    })
  }
  // onSubmit(form:NgForm){
  //   console.log(form.value);
  // }
  onSubmit(form: NgForm){
    this.transaction.updatePassword(form.value).toPromise().then((data:any)=>{
    this.toast.info("Mot de passe a été modifié avec succès"),this.Effacer();
  },
    err=>{
                  if(err.status==900){
                    this.isLoginError = true;
                    this.message="Ancien mot de passe incorrect";
                  }
                 else
                 if(err.status==901){
                  this.isLoginError = true;
                  this.message="confirmation mot de passe incorrecte!  Réessayer";
                }
                else 
                if(err.status==902){
                  this.isLoginError = true;
                  this.message="Mot de passe a été déjà utilisé! Réessayer";
                }
                else
                 console.log(err);
  
               }
    
    )

    
  }
  Effacer(){
     this.filterform.reset();
     this.isLoginError = false;
  }
}

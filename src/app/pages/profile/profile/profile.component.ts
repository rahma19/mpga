import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'app/model/mpga/account';
import { TransactionService } from 'app/pages/services/transaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  profile= new Account;
  filterform: FormGroup;
  hide: boolean=true;
  isLoginError : boolean = false;
  change:boolean=false;
  psw:boolean=false;
  empty:boolean=false;

  constructor(private transaction:TransactionService,private toast: ToastrService, private fb: FormBuilder, private dialog:MatDialog) { }

  ngOnInit() {
   // this.ngProgress.start();
    this.transaction.GetAccount().subscribe((data:any)=>{
      this.profile=data;
    //  this.ngProgress.complete();
    });

    this.filterform = this.fb.group({
      useName:[''],
      useEmail:[''],
      useDescription:[''],
      useLogin:[''],
      password: new FormControl('', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*\.])/)])),
    })
  }
  onSubmit(form: NgForm){
    //this.ngProgress.start();
    this.transaction.updateAccount(form.value).toPromise().then((data:any)=>{
    this.toast.info("Profile a été modifié avec succès");
    this.isLoginError=false;
    this.empty=false;
    this.ngOnInit();
  },
    err=>{
      if(err.status==900 && form.value.password!=""){
        this.isLoginError = true;
        this.empty=false;
      }
      else {
        console.log(err);
      }
      if(err.status==900 && form.value.password==""){
        this.isLoginError=false;
        this.empty=true;
      }
    }
    )
    //this.ngProgress.complete();
  }
  check(event){
    this.change=true;
  }
  checkpassword(event){
    this.psw=true;
  }
// Modifier(){
//   const dialogConfig= new MatDialogConfig;
//     dialogConfig.disableClose=true;
//     dialogConfig.autoFocus=true;
//     dialogConfig.width="50%";
//     dialogConfig.height="52%";
//     this.dialog.open(EditProfileComponent,dialogConfig);
// }
}

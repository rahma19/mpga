import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Service } from 'app/model/mpga/service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ServiceService } from 'app/pages/services/service.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateServiceComponent implements OnInit {
  serviceform: FormGroup;
  aff:any;
  id:any;
  updateservice=new Service;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  err:boolean=false;
  disable:boolean=false;
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateServiceComponent>,
  private serv:ServiceService,private fb:FormBuilder, 
  private formUtils: FormUtils,private translate:TranslateService,private toast :ToastrService ) { }

  ngOnInit(): void {
    this.aff=this.data.affiliationMonetique;
    this.id=this.data.idMagasinWallet;
    this.serviceform=this.fb.group({
      affiliation: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  Fermer(){
    this.dialogRef.close();
    }
reset(){
  this.aff=this.data.affiliationMonetique;
}
onSubmit(form){
  if (form.invalid) {
    this.onError()
    this.markInvalidControls(form);
  }
  else if(form.valid){
    this.disable=true;
  this.updateservice.idMagasinWallet=this.id;
  this.updateservice.affiliationMonetique=this.aff;
  this.serv.updateservice(this.updateservice).subscribe(res=>{
    this.dialogRef.close('1');
    this.toast.success(this.translate.instant('toast.modifier') );
  },err=>{
    this.disable=false;
    this.err=true;
if(err.status==400){
this.msg=this.translate.instant('toast.echec');
console.log(err);
}
  })
  }
}
Mini(){ 
  this.isOpened=false ;
    this.dialogRef.updatePosition({
      bottom:'15px',
      right: '15px', 
    })
    this.dialogRef.updateSize("350px", "auto");
    this.isOpened2=false ;
  }
  
  Maxi(){ 
    this.isOpened2=true;
    console.log(this.isOpened2)
    this.dialogRef.updatePosition({
      
    })
    this.dialogRef.updateSize("500px", "auto");
    this.isOpened=true;
   
  }
onFocus(types: TYPE_MESSAGE[], required: boolean, num?) {
  this.Messages = this.formUtils._getFormControlMessage(types, required, num)
}
onBlur() {
  this.Messages = [];
}
onError() {
  this.Messages = [this.formUtils._error()];
}
markInvalidControls(form): void {
  const controls = form.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      controls[name].markAllAsTouched();
    }
  }
}
}

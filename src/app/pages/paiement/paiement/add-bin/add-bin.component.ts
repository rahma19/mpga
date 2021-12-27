import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-bin',
  templateUrl: './add-bin.component.html',
  styleUrls: ['./add-bin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBinComponent implements OnInit {

  binform:FormGroup
  etablissements:any;
  non:any
  debpla:any;
  finpla:any;
  emetteur:any;
  acq:any
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  msg:any
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<AddBinComponent>,private toast:ToastrService,
    private paiement:PaiementService, private formUtils: FormUtils,private translate:TranslateService) { }

  ngOnInit(): void {

    this.binform=this.fb.group({
      nomPlageBin:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      debutPlageBin:['',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(6),Validators.minLength(6)]],
      finPlageBin:['',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(6),Validators.minLength(6)]],
      idEmetteur:['',[Validators.required]],
  
      idAcquereur:['',[Validators.required]],
    })
    this.paiement.ListEtablissementFinancier().subscribe(res=>{
      this.etablissements=res
      
    })
  }
  OnSubmit(form:NgForm){
    if(this.binform.invalid){
      // this.binform.get('debutPlageBin').markAllAsTouched()
      // this.binform.get('finPlageBin').markAllAsTouched()
      // this.binform.get('idEmetteur').markAllAsTouched()
      // this.binform.get('idAcquereur').markAllAsTouched()
      // this.binform.get('nomPlageBin').markAllAsTouched()
      
      // return
      this.onError()
      this.markInvalidControls(this.binform);
    }
    if(this.binform.valid){
      this.disable=true;
      this.paiement.AddBin(form.value).subscribe(res=>{
        this.dialogRef.close("1")
        this.toast.success(this.translate.instant('toast.ajouter') );
        this.ngOnInit()
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
  Fermer(){
    this.dialogRef.close()
  }
  Reset(){
    this.binform.reset()
  }
  geterrorlr(){
    return this.binform.get('debutPlageBin').hasError('required') ? 'Champ Obligatoire ':
    this.binform.get('debutPlageBin').hasError('pattern') ? 'que des Chiffres' : 
    this.binform.get('debutPlageBin').hasError('minlength') ? 'il faut 6 chiffres' : ''
  }
  geterrorhr(){
    return this.binform.get('finPlageBin').hasError('required') ?  'Champ Obligatoire' :
    this.binform.get('finPlageBin').hasError('pattern') ? 'que des Chiffres' : 
    this.binform.get('finPlageBin').hasError('minlength') ? 'il faut 6 chiffres' : ''
  }
  
  geterrornom(){
    return this.binform.get('nomPlageBin').hasError('required') ? 'Champ Obligatoire' :
    this.binform.get('nomPlageBin').hasError('pattern') ? 'que des lettres et des chiffres' : '';
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
      this.dialogRef.updateSize("600px", "auto");
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

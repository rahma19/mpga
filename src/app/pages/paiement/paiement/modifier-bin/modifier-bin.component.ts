import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Bin } from 'app/model/mpga/bin';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modifier-bin',
  templateUrl: './modifier-bin.component.html',
  styleUrls: ['./modifier-bin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModifierBinComponent implements OnInit {

  binform:FormGroup
  id:any
  detail=new Bin()
  issuers:any
  etablissements:any
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private dialogRef:MatDialogRef<ModifierBinComponent>,
   private toast:ToastrService,private paiement: PaiementService, private formUtils: FormUtils,private translate:TranslateService) { }

  ngOnInit(): void {
    this.id=this.data.idBin
    this.binform=this.fb.group({
      idBin:[''],
      nomPlageBin:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]*$")]],
      debutPlageBin:['',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(6),Validators.minLength(6)]],
      finPlageBin:['',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(6),Validators.minLength(6)]],
      idEmetteur:['',[Validators.required]],
  
      idAcquereur:['',[Validators.required]],
    })
    this.paiement.ListEtablissementFinancier().subscribe(res=>{
      this.etablissements=res
      
    })
    this.paiement.GetBin(this.id).subscribe((res:Bin)=>{
      this.detail.idBin=res.idBin;
      this.detail.debutPlageBin=res.debutPlageBin
      this.detail.finPlageBin=res.finPlageBin
      this.detail.idEmetteur=res.idEmetteur
      this.detail.nomPlageBin=res.nomPlageBin
      this.detail.idAcquereur=res.idAcquereur
// console.log(this.detail)
      
    })
    
  }
  onSubmit(form:NgForm){
    if(this.binform.invalid){
      this.onError()
      this.markInvalidControls(this.binform);
    }
    if(this.binform.valid){
      this.disable=true;
      this.paiement.UpdateBin(form.value).subscribe(res=>{
        this.dialogRef.close("1")
        this.toast.success(this.translate.instant('toast.modifier') );
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
  Reset(){
    this.paiement.GetBin(this.id).subscribe((res:Bin)=>{
      this.detail.idBin=res.idBin;
      this.detail.debutPlageBin=res.debutPlageBin
      this.detail.finPlageBin=res.finPlageBin
      this.detail.idEmetteur=res.idEmetteur
      this.detail.nomPlageBin=res.nomPlageBin
      this.detail.idAcquereur=res.idAcquereur
console.log(this.detail)
      
    })
  }
  Fermer(){
    this.dialogRef.close()
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


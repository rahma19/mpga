import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-canal',
  templateUrl: './ajouter-canal.component.html',
  styleUrls: ['./ajouter-canal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AjouterCanalComponent implements OnInit {
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  produit:any
  produits:any
  canal:any
  canals:any
  id:any
  canalform:FormGroup
  acquisition:boolean
  emission:boolean
  resultat:any
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<AjouterCanalComponent>,
  private paiement:PaiementService,private fb:FormBuilder,private toast:ToastrService
  ,private formUtils: FormUtils, private translate:TranslateService) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.canalform=this.fb.group({
      idProduitFinancier: new FormControl('',[Validators.required]),
      idCanalPaiement: new FormControl('',[Validators.required]),
      flagEmission: new FormControl(''),
      flagAcquisition: new FormControl(''),
    })
    this.id=this.data.idEtablissementFinancier
    this.paiement.ListProduitByEtablissement(this.id).subscribe(res=>{
      this.produits=res
    })
    this.paiement.CanalPaiement().subscribe(res=>{
      this.canals=res
    })
  }
  Fermer(){
    this.dialogRef.close()
  }

  onSubmit(form){
    if(this.canalform.invalid){

      // this.canalform.get('idProduitFinancier').markAllAsTouched()
      // this.canalform.get('idCanalPaiement').markAllAsTouched()
      
      this.onError()
      this.markInvalidControls(this.canalform);
    }
if(this.canalform.valid){
  this.disable=true;
this.paiement.AffectationCanalPaiementProduit(this.canalform.value).subscribe(res=>{
  this.dialogRef.close("1")
  // this.toast.success('Affectation effectué avec succées')
  this.toast.success(this.translate.instant('toast.affectCanal') );
  this.ngOnInit()
},erreur=>{
  this.disable=false;
  this.err=true;
if(erreur.status==400){
this.msg=this.translate.instant('toast.echec');
console.log(erreur);
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
  reset(){
    this.canalform.reset()
    
  }
  changecanal(event){
    if(this.produit && this.canal !=''){
      this.paiement.getCanatProduitById(this.produit,this.canal).subscribe(res=>{
        this.resultat=res
        this.emission=this.resultat.flagEmission
        this.acquisition=this.resultat.flagAcquisition
      })
    }
  }
}

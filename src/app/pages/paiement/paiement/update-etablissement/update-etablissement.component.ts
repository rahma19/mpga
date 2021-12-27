import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AddEtablissement } from 'app/model/mpga/ajouter_etablissement';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-etablissement',
  templateUrl: './update-etablissement.component.html',
  styleUrls: ['./update-etablissement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateEtablissementComponent implements OnInit {
  etablissementform:FormGroup
  raison:any
  commercial:any
  aberge:any
  rne:any
  cat:any
  adresse:any
  adresse_:any
  categories:any
  gouvernorats:any
  villes:any
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  types:any
  type:any
  nonbrecart:any
  id_identifiant:any
  rue: any
  gouv:any
  vil:any
  codes:any
  code:any
  ajouter=new AddEtablissement
 id:any
 produits:any
 err:boolean=false;
 disable:boolean=false;
 public Type_Message = TYPE_MESSAGE;
 Messages: FormMessage[]
 msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<UpdateEtablissementComponent> 
  ,private paiement:PaiementService,private fb:FormBuilder,private mg:MagasinService,
  private toast:ToastrService,private formUtils: FormUtils,
  private translate:TranslateService) { }

  ngOnInit(): void {
    this.etablissementform=this.fb.group({
      raison_sociale: new FormControl({ value: '', disabled: true }),
      nom_commercial: new FormControl({ value: '', disabled: true }),
      nom_abrege: new FormControl({ value: '', disabled: true }),
      id_categorie: new FormControl('',[Validators.required]),
      id_type_identification: new FormControl({ value: '', disabled: true }),
      rne: new FormControl({ value: '', disabled: true }),
     rue: new FormControl('',[Validators.required]),
      id_gouvernourat: new FormControl('',[Validators.required]),
      id_ville: new FormControl('',[Validators.required]),
      code_postal: new FormControl({ value: '', disabled: true }),
    })
    console.log(this.data)
    this.id=this.data.idEtablissementFinancier
    this.paiement.ListProduitByEtablissement(this.id).subscribe(res=>{
      this.produits=res
      console.log('produits',this.produits);
      
    })
    this.raison=this.data.nom
    this.commercial=this.data.nomCommercial
    this.aberge=this.data.nomAbrege
    this.type=this.data.idTypeIdentification
    this.rne=this.data.rne
    this.cat=this.data.idCategorieEtablissementFinancier
    this.rue=this.data.rue
    this.gouv=this.data.idGouvernorat
    if(this.gouv!=null){
    this.mg. getvillebyid(this.gouv).subscribe(res=>{
      this.villes=res
    })
  }
    this.vil=this.data.idville
    this.code=this.data.codePostal



this.paiement.ListTypeIdentification().subscribe(res=>{
  this.types=res
})
this.paiement.ListCategoriesEtablissement().subscribe(res=>{
  this.categories=res
})
this.mg.getgouvernorat().subscribe(res=>{
  this.gouvernorats=res
})
  }
  reset(){
    this.raison=this.data.nom
    this.commercial=this.data.nomCommercial
    this.aberge=this.data.nomAbrege
    this.type=this.data.idTypeIdentification
    this.rne=this.data.rne
    this.cat=this.data.idCategorieEtablissementFinancier
    this.rue=this.data.rue
    this.gouv=this.data.idGouvernorat
    if(this.gouv!=null){
      this.mg. getvillebyid(this.gouv).subscribe(res=>{
        this.villes=res
      })
    }
    this.vil=this.data.idville
    this.code=this.data.codePostal

  }
  Fermer(){
    this.dialogRef.close()
  }
  onSubmit(form){
    if(this.etablissementform.invalid){

      // this.etablissementform.get('id_categorie').markAllAsTouched()
      // this.etablissementform.get('rue').markAllAsTouched()
      // this.etablissementform.get('id_gouvernourat').markAllAsTouched()
      // this.etablissementform.get('id_ville').markAllAsTouched()
      this.onError()
      this.markInvalidControls(this.etablissementform); 
    }
if(this.etablissementform.valid){
  this.disable=true;
this.ajouter.id_etablissement_financier=this.data.idEtablissementFinancier
this.ajouter.id_categorie=this.cat
this.ajouter.rue=this.rue

this.ajouter.id_ville=this.vil
this.paiement.UpdateEtablissement(this.ajouter).subscribe(res=>{
  this.dialogRef.close("1")
  this.toast.success(this.translate.instant('toast.modifier') );
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



  changegouvernorat(gouv){
    this.vil=''
if(this.gouv!==''){
  this.mg. getvillebyid(this.gouv).subscribe(res=>{
    this.villes=res
  })
}
  }
  changeville(vil){
    this.code=''
    if(this.vil!=''){
      this.mg.getpostalbyid(this.vil).subscribe(res=>{
        this.codes=res
        this.code=this.codes.codePostal
      })
    }
  }


 
}

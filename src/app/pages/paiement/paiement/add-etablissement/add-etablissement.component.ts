import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AddEtablissement } from 'app/model/mpga/ajouter_etablissement';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-etablissement',
  templateUrl: './add-etablissement.component.html',
  styleUrls: ['./add-etablissement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEtablissementComponent implements OnInit {
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
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  msg:any
  constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<AddEtablissementComponent> ,
    private paiement:PaiementService,private mg:MagasinService,private toast:ToastrService,private formUtils: FormUtils,
    private translate:TranslateService) { }

  ngOnInit(): void {
    this.etablissementform=this.fb.group({
      raison_sociale: new FormControl('',[Validators.required,Validators.pattern("^[^\\s][a-zA-Z0-9 ]+")]),
      nom_commercial: new FormControl('',[Validators.required,Validators.pattern("^[^\\s][a-zA-Z0-9 ]+")]),
      nom_abrege: new FormControl('',[Validators.required,Validators.pattern("^[^\\s][a-zA-Z0-9 ]+"),Validators.maxLength(8),Validators.minLength(8)]),
      id_categorie: new FormControl('',[Validators.required]),
      id_type_identification: new FormControl('',[Validators.required]),
      rne: new FormControl(),
     rue: new FormControl('',[Validators.required]),
      id_gouvernourat: new FormControl('',[Validators.required]),
      id_ville: new FormControl('',[Validators.required]),
      code_postal: new FormControl({ value: '', disabled: true }),
    })
    this.etablissementform.controls['rne'].disable();
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
    this.etablissementform.reset()
  }
  Fermer(){
    this.dialogRef.close()
  }
  onSubmit(form){
    if(this.etablissementform.invalid){
      // this.etablissementform.get('raison_sociale').markAllAsTouched()
      // this.etablissementform.get('nom_commercial').markAllAsTouched()
      // this.etablissementform.get('nom_abrege').markAllAsTouched()
      // this.etablissementform.get('id_type_identification').markAllAsTouched()
      // this.etablissementform.get('id_categorie').markAllAsTouched()
      // this.etablissementform.get('rue').markAllAsTouched()
      // this.etablissementform.get('id_gouvernourat').markAllAsTouched()
      // this.etablissementform.get('id_ville').markAllAsTouched()
      this.onError()
      this.markInvalidControls(this.etablissementform);
    }
if(this.etablissementform.valid){
  this.disable=true;
this.ajouter.raison_sociale=this.raison
this.ajouter.nom_commercial=this.commercial
this.ajouter.nom_abrege=this.aberge
this.ajouter.id_type_identification=this.id_identifiant
this.ajouter.id_categorie=this.cat
this.ajouter.rue=this.rue
this.ajouter.rne=this.rne
this.ajouter.id_ville=this.vil
this.paiement.AddEtablissement(this.ajouter).subscribe(res=>{
  this.dialogRef.close("1")
  this.toast.success(this.translate.instant('toast.ajouter') );
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

  geterrorraison(){
    return this.etablissementform.get('raison_sociale').hasError('required') ? 'champ Obligatoire ' :
    this.etablissementform.get('raison_sociale').hasError('pattern') ? 'invalid! que des lettres et des chiffres' :''
    
    
  }
  geterrornon(){
    return this.etablissementform.get('nom_commercial').hasError('required') ? 'champ Obligatoire ' :
    this.etablissementform.get('nom_commercial').hasError('pattern') ? 'invalid! que des lettres et des chiffres' :''
  }
  geterrornonaberg(){
    return this.etablissementform.get('nom_abrege').hasError('required') ? 'champ Obligatoire ' :
    this.etablissementform.get('nom_abrege').hasError('minlength') ? 'il faut 8 caractéres' :
    this.etablissementform.get('nom_abrege').hasError('pattern') ? 'invalid! que des lettres et des chiffres' :''
  }
  geterreurrne(){
    return this.etablissementform.get('rne').hasError('required') ? 'champ Obligatoire ' :
    this.etablissementform.get('rne').hasError('minlength') ? 'il faut  '+ this.nonbrecart+' caractéres':
    this.etablissementform.get('rne').hasError('pattern') ? 'invalid! que des lettres et des chiffres' :''
  }
  changetypeidentification(identifiant){
console.log(this.type)
this.rne=''
this.etablissementform.controls['rne'].enable();
this.nonbrecart=this.type.nombreCaractere
this.id_identifiant=this.type.idTypeIdentification
  this.etablissementform.controls['rne'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/),Validators.minLength(this.nonbrecart),Validators.maxLength(this.nonbrecart)]);              
  }
  changegouvernorat(gouv){
    this.vil=''
    this.code=''
if(this.gouv !=''){
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

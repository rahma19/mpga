import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { TransactionService } from 'app/pages/services/transaction.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { Postal } from 'app/model/mpga/postal';
import { AddMagasin } from 'app/model/mpga/addmagasin';
import { ResZone } from 'app/model/mpga/reszone';
import { TranslateService } from '@ngx-translate/core';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
  
@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html',
  styleUrls: ['./add-vente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddVenteComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();
  serviceform: FormGroup;
  caisseform: FormGroup;
  contactform:FormGroup;
  ListeSous=[];
  selectedIds=[];
  listeoperateur=[];
  partenaires:any;
  partenaire:any;
  Affilies:any;
  level:any;
  gouvernorats:any;
  ville:any;
  villes:any;
  codepos:any;
  clientId:any;
  checked: boolean=false;
  valid:boolean=false;
  id_type_ges:number=3;
  gestionnaire:any;
  message:any;
  credit:any;
  quota:any;
  formatage:any;
  creditformat:any;
  resultat:any;
  addmagasin= new AddMagasin;
  listecontact=[];
  settings:any;
  settingsservice:any;
  zones:any;
  listeRZ:any;
  listeRM:any;
  listeARM:any;
  idwallet:any;
  wallets:any;
  exp:number=43;
  test=[];
  cleLuhn:any;
  binVcn:any;
  azizaClt:any;
  chaine:string;
  nomRZ:any;
  zone:any;
  villegouver:any;
  gouver:any;
  nomRM:any;
  nomARM:any;
  affiliation:any;
  loading:boolean=false;
  isConnectionAvailableMA: boolean = navigator.onLine; 
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  id=1
  msg:any;
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  constructor(private dialogRef: MatDialogRef<AddVenteComponent> ,private Transaction:TransactionService,
    private format:FormatNumberPipe,private dialog:MatDialog,private fb:FormBuilder,private toast: ToastrService,
    private mag:MagasinService, private formUtils: FormUtils,private translate:TranslateService) { 
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMA = false
      this.dialogRef.close()
  });
  }
  ngOnInit() {
    //MOD
    //this.test=10-(this.exp)%10;
    //MOD

  
    this.caisseform = this.fb.group({
      nbr_caisse:[''],
     
    });
    this.serviceform= this.fb.group({
      service:[''],
      type:['']
    });
     this.contactform=this.fb.group({
      nom_mg:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(30)])),
      nombre_caisse:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])),
      nombre_caissier: new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])),
      code:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(4)])),
      adrIP:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(25),Validators.pattern("^[0-9.]*$")])),
      // zone_:new FormControl('', Validators.compose([Validators.required])),
      // rue_:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
      // gouvernorat:new FormControl('', Validators.compose([Validators.required])),
      // ville:new FormControl('', Validators.compose([Validators.required])),
      // codepostal:new FormControl({value: '', disabled: true}),
      // tele:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      // fax_:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      // email_:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      // RM:new FormControl(''),
      // ARM:new FormControl(''),
      // RZ:new FormControl({value: '', disabled: true}),
      affiliationd17:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(5),Validators.minLength(5)]))
     });
   
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
      startWith(''),
      map(val => val.length >= 1 ? this.doFilter(val): [])
      );
this.Apis();
  }
  Apis(){
    this.Transaction.getZone().subscribe(res=>{
      this.zones=res;
    })
    this.Transaction.listewallet(this.id).subscribe(res=>{
     
      this.wallets=res;
    //  console.log('bin et clt  ',this.wallets);
      for(var i=0;i<this.wallets.length;i++){
      this.idwallet=this.wallets[i].idProduitFinancier;
      this.binVcn=this.wallets[i].d17BinVcn;
      this.azizaClt=this.wallets[i].d17AzizaClt;
     console.log(this.idwallet,this.binVcn,this.azizaClt);
      }
    })
this.mag.agentbycategorie(1).subscribe(res=>{
this.listeRZ=res;
})
this.mag.agentbycategorie(2).subscribe(res=>{
this.listeRM=res;
})
this.mag.agentbycategorie(3).subscribe(res=>{
this.listeARM=res;
})


  this.mag.getgouvernorat().subscribe(res=>{
    this.gouvernorats=res;
  });
  }
  getville(gouver){
    this.mag.getvillebyid(gouver).subscribe(res=>{
      this.villes=res;
     // console.log('villes!', this.villes);
    })
  }
  getresponsable(zone){
    this.mag.getrespzonebyIdzone(zone).subscribe((res:ResZone)=>{
    this.nomRZ=res.libelle_responsable_zone;
    })
  }
  getpostal(villegouver){
    this.mag.getpostalbyid(villegouver).subscribe((res:Postal)=>{
      this.codepos=res.codePostal;
    })
  }
 
  doFilter(value:string):string[]{
    
    return this.partenaires.map((x:any) => x.prtRaisonSociale).filter(option =>
     option.toLowerCase().includes(value.toLowerCase()));
     }
  Somme(value){
    var somme
    var string:string='';
    string= String(value);
  //  console.log('value from function somme ::::',string);
    somme=0;
    for( var i=0;i<string.length;i++){
    // console.log('string i ',string[i]);
      somme=somme+Number(string[i]);
    }
    return somme;
  }
  calculLuhn(affiliation:any){
    if (affiliation.length>4){
      var total =0
      this.test=[];
   // console.log(affiliation);
    this.chaine=this.binVcn+this.azizaClt+affiliation;
    console.log('my chain e' , this.chaine);
    var j=2;
    var som;
    for( var i=0;i<this.chaine.length;i++){
      som=0;
      som=j*Number(this.chaine[i]);
     //  console.log(som);
      var result=this.Somme(som);
    //  console.log('somme des deux!!' ,result);
      this.test.push(result);
      if(j==2)
      {j=1}
      else if(j==1){j=2};
    }
   console.log('test',this.test);
    for( var k=0;k<this.test.length;k++){
      total=total+this.test[k];
      
    }
   console.log('total',total);
    this.cleLuhn=10-(total)%10;
   console.log('valeur',this.cleLuhn);
    }
  }
 
  updatecredit() {
    if( this.credit!= undefined && this.credit != ''){
    if (this.credit.indexOf('TND') == -1&& this.credit.indexOf(',') == -1){
      this.credit=this.format.transform(this.credit);
  }
  }
  }
  getErrorMessage() {
   return this.contactform.get('email_').hasError('required')?'*Champ obligatoire':
   this.contactform.get('email_').hasError('email')?'Email invalid':"";
  }
  getErrorCode() {
    return this.contactform.get('code').hasError('required')?'*Champ obligatoire':
    this.contactform.get('code').hasError('pattern')?'Que des chiffres':
    this.contactform.get('code').hasError('minlength')?'Minimum 4 chiffres':"";
   }
  getErrorFax() {
    return this.contactform.get('fax_').hasError('required')?'*Champ obligatoire':
    this.contactform.get('fax_').hasError('pattern')?'Num fax invalid':
    this.contactform.get('fax_').hasError('minlength')?'Num fax de 8 chiffres':"";
   }
   getErroraffiliation() {
    return this.contactform.get('affiliationd17').hasError('required')?'*Champ obligatoire':
    this.contactform.get('affiliationd17').hasError('pattern')?'Entrer 5 chiffres':
    this.contactform.get('affiliationd17').hasError('minlength')?'Entrer 5 chiffres':"";
   }
   getErrorTel() {
    return this.contactform.get('tele').hasError('required')?'*Champ obligatoire':
    this.contactform.get('tele').hasError('pattern')?'Num téléphone invalid':
    this.contactform.get('tele').hasError('minlength')?'Num téléphone de 8 chiffres':"";
   }
   getErrorIP(){
    return this.contactform.get('adrIP').hasError('required')?'*Champ obligatoire':
    this.contactform.get('adrIP').hasError('pattern')?'@ IP invalid':"";
   }
  onSubmit(form1){
    if (form1.invalid) {
      this.onError()
      this.markInvalidControls(form1);
    }
    else if(form1.valid){
      for(var i in form1.value) { 
        if(form1.value[i] === undefined) {
          form1.value[i] = '';
        }
      }
      this.disable=true;
      this.addmagasin.code_magasin=form1.value.code;
      this.addmagasin.libelle=form1.value.nom_mg;
     // this.addmagasin.idZoneGeographique=form1.value.zone_;
      this.addmagasin.nombreCaisse=form1.value.nombre_caisse;
      this.addmagasin.nombreCaissier=form1.value.nombre_caissier;
      this.addmagasin.adresseIpRacine=form1.value.adrIP;
      // this.addmagasin.debutPlageAdresseIpCaisse=form1.value.debut_plage;
      // this.addmagasin.debutPlageAdresseIpTpe=form1.value.fin_plage;
     // this.addmagasin.rue=form1.value.rue_;
     // this.addmagasin.idville=form1.value.ville;
     // this.addmagasin.numeroTelephone=form1.value.tele;
     // this.addmagasin.fax=form1.value.fax_;
    //  this.addmagasin.email=form1.value.email_;
     // this.addmagasin.idResponsableMagasin=form1.value.RM;
    //  this.addmagasin.idResponsableZone=form1.value.RZ;
     // this.addmagasin.idAdjointResponsableMagasin=form1.value.ARM;
      var affiliation:string;
      affiliation=this.chaine+this.cleLuhn;
      // affiliation=form1.value.affiliationd17+this.cleLuhn;
      console.log("affiliation",affiliation)
      this.addmagasin.affiliationMonetique=affiliation;
      this.addmagasin.idWallet=this.idwallet;
     // console.log(this.addmagasin);
      this.mag.addmagasin(this.addmagasin).subscribe(res=>{
        this.dialogRef.close(1);
       
        this.toast.success(this.translate.instant('toast.ajouter'),'', {timeOut: 2500});
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
    this.dialogRef.close();
      }
  reset(form1){
    form1.reset();
    this.villes=[];
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
      this.dialogRef.updateSize("650px", "auto");
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

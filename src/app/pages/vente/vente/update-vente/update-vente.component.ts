import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger} from '@angular/material/menu';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';

import { MagasinService } from 'app/pages/services/magasin.service';

import { DetailMagasin } from 'app/model/mpga/detailmagasin';
import { Postal } from 'app/model/mpga/postal';
import { TransactionService } from 'app/pages/services/transaction.service';
import { AddMagasin } from 'app/model/mpga/addmagasin';
import { UpdateAgentComponent } from './update-agent/update-agent.component';
import { ErrormsgComponent } from './errormsg/errormsg.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateCaisseComponent } from '../update-caisse/update-caisse.component';
import { UpdateServiceComponent } from '../update-service/update-service.component';
import { ActifServiceComponent } from '../actif-service/actif-service.component';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { DatailCanalComponent } from './datail-canal/datail-canal.component';
import { DetailCaisseComponent } from './detail-caisse/detail-caisse.component';

export class ServiceNode {
  id_famille: number;
  designation: string;
 // children?: FoodNode[];
 listOperateur:{
  id_famille:number;
  iD_Operateur:number;
  ope_RaisonSociale:string;
  listOpeSousFamille:{
    idOperateur:number;
    id_sous_famille:number;
    designation_sous_famille:string;
  }
 }
}
export class TodoItemFlatNode {
  item: ServiceNode;
  level: number;
  expandable: boolean;
}
@Component({
  selector: 'app-update-vente',
  templateUrl: './update-vente.component.html',
  styleUrls: ['./update-vente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateVenteComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.listOperateur);
  dataSource = new MatTreeNestedDataSource<ServiceNode>();
  checklistSelection = new SelectionModel<ServiceNode>(true);
  TREE_DATA: TodoItemFlatNode[] = [];
  nestedNodeMap = new Map<ServiceNode, TodoItemFlatNode>();
  filteredOptions: Observable<string[]>;
  myControl: FormControl = new FormControl();
  magasinform: FormGroup;
  serviceform:FormGroup;
  caisseform: FormGroup;
  agentform: FormGroup;
  activetab:string = 'magasin';
  partenaires:any;
  gest_parc:any;
  gouvernorats:any;
  villes:any;
  codepos:any;
  categories:any;
  level:any;
  clientId:any;
  Affilies:any;
  partenaire:any;
  id_aff:any;
  PointVente:any;
  id:any;
  id_tier:any;
  id_tier_sup:any;
  id_part:any;
  sociale:any;
  gestionnaire:any;
  code:any;
  credit:any;
  categorie:any;
  listeoperateur=[];
  selectedIds=[];
  ListeSous=[];
  LService: any;
  List_Opert=[];
  List_Opert2=[];
  valid:boolean=false;
  id_type_gest:number=3;
  resultat:any;
  result:any;
  listecontact=[];
  message:any;
  quota:any;
  formatage:any;
  creditformat:any;
  id_type_entite:any;
  // contextMenuPosition = { x: '0px', y: '0px' };
  settings:any;
  settingsservice:any;
  source:any;
  // sourceservice:any;
  magasin:any;
  nom_magasin:any;
  code_mg:any;
  rue:any;
  villegouver:any;
  gouver:any;
  telephone:any;
  fax:any;
  email:any;
  editmagasin= new AddMagasin;
  agents:any;
  nombrecaisse:any;
  adresseIP:any;
  loading:boolean=false;
  listeImpression=[];
  liste:any;
  couleur1:any
  couleur2:any
  couleur3:any
  couleur4:any
  isConnectionAvailableMU: boolean = navigator.onLine; 
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  msg:any;
  item:any
  service = new MatTableDataSource<any>()
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  listecaisses:any
  idetat:any
  displayedColumns: string[] = ['etablissemnt','nomWallet','affiliationMonetique','mode',
 'listCanalPaiement','numeroRefMpga','etatWallet'];
  displayedColumnscaisse: string[] = ['code','libelleCaisse','adresseIpCaisse','adresseIpTpe','qrCode','etatCaisse'];
  Messages: FormMessage[]
  contextMenuPosition=  {a: '0', b: '0'};
  caissedata= new MatTableDataSource<any>()
  @ViewChild(MatMenuTrigger) srvcontextMenu: MatMenuTrigger;
  @ViewChild('triggers') triggers: MatMenuTrigger;
  srvcontextMenuPosition = { c: '0px', d: '0px' };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('caissPaginator') caissPaginator: MatPaginator;
  @ViewChild('sortcaiss') sortcaiss: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog,private format:FormatNumberPipe,
   private dialogRef: MatDialogRef<UpdateVenteComponent> ,private fb:FormBuilder,
   private toast: ToastrService,private mag:MagasinService,private Transaction:TransactionService
   , private formUtils: FormUtils,private translate:TranslateService,private changeDetector: ChangeDetectorRef ,
   private Etabli:EtablissementFinancierService ) {
  
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMU = false
      this.dialogRef.close()
  });
   }
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  ngOnInit() {
    console.log(this.data);
    this.id=this.data.idMagasin;
    this.mag.getmagasinbyId(this.id).subscribe((res:DetailMagasin)=>{
     this.nom_magasin=res.libelle;
     this.code_mg=res.code;
    //  this.rue=res.rue;
    //  this.gouver=res.idGouvernorat;
    //  this.villegouver=res.idVille;
    //  this.mag.getpostalbyid(this.villegouver).subscribe((res:Postal)=>{
    //   this.codepos=res.codePostal;
    // })
    // this.codepos=res.idCodePostal;
    //  this.telephone=res.telephone;
    //  this.fax=res.fax;
    //  this.email=res.email;
      this.nombrecaisse=res.nombreCaisse;
      this.adresseIP=res.adresseIpRacine;

      
    //  this.mag.getvillebyid(this.gouver).subscribe(res=>{
    //    this.villes=res;
    //  })
    })
    this.mag.listecaissebymagasin(this.id).subscribe((res:any)=>{
      // this.resultat=res;
      this.listecaisses=res
     console.log('liste caisse  ',this.listecaisses);
    
    
    })
    this.mag.listeimpression().subscribe((res:any)=>{
      this.liste=res;
     // console.log('liste here first',this.liste);
      this.liste.forEach(element => {
        this.listeImpression.push({value:element.idImpressionQr, title:element.libelle});
      //  console.log('liste here second',this.listeImpression);
      });
    })
    this.Transaction.walletbymagasin(this.id).subscribe((res:any)=>{
      this.result=res;
      console.log('liste services  ',this.result);
      
     
      
    })
    // this.mag.getgouvernorat().subscribe(res=>{
    //   this.gouvernorats=res;
    // });
    this.mag.listeagentBymagasin(this.id).subscribe(res=>{
      this.agents=res;
    })
    this.magasinform = this.fb.group({
      nom_mg:new FormControl('', [Validators.required,Validators.maxLength(30)]),
     // nombre_caisse:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$")])),
      code:new FormControl({value: '', disabled: true}),
      // codepostal:new FormControl({value: '', disabled: true}),
      // rue_:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
      // gouvernorat:new FormControl('', Validators.compose([Validators.required])),
      // ville:new FormControl('', Validators.compose([Validators.required])),
      // tele:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      // fax_:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      // email_:new FormControl('',Validators.compose([Validators.required,Validators.email])),
     // affiliationd17:new FormControl('', Validators.compose([Validators.maxLength(16)]))
    });
    this.serviceform= this.fb.group({
      nom_mgserv:new FormControl({value: '', disabled: true}),
      code:new FormControl({value: '', disabled: true}),
    });
    // this.caisseform=this.fb.group({
    //   nbr_caisse: new FormControl({value: '', disabled: true}),
    //   adrIP:new FormControl({value: '', disabled: true}),
    // });
    this.agentform=this.fb.group({});

    
   
  }
  onSaveConfirm(event) {
    
   // console.log("Edit Event In Console")
    console.log(event);
    event.confirm.resolve(event.newData);
  //  console.log(this.resultat);
   // this.source= new LocalDataSource(this.resultat);
  } 
  getville(gouver){
    this.villegouver='';
    this.codepos='';
    this.mag.getvillebyid(gouver).subscribe(res=>{
      this.villes=res;
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

 tab(event){
 
  let active = document.getElementById(event);
  let oldactive = document.getElementsByClassName('activetab');
  oldactive[0].classList.remove('activetab')
  active.classList.add('activetab')
  this.activetab = event;

 // console.log(this.activetab);
}
// onContextMenu(event: MouseEvent,liste,i) {
//   event.preventDefault();
//   this.contextMenuPosition.x = event.clientX + 'px';
//   this.contextMenuPosition.y = event.clientY + 'px';
//   this.contextMenu.menuData = {"liste":liste,"i":i};
//   this.contextMenu.menu.focusFirstItem('mouse');
//   this.contextMenu.openMenu();
// }

detailagent(v){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="500px";
  dialogConfig.height="auto";
  dialogConfig.data=v;
  this.dialog.open(UpdateAgentComponent,dialogConfig);
}
getErrorMessage() {
  return this.magasinform.get('email_').hasError('required')?'*Champ obligatoire':
  this.magasinform.get('email_').hasError('email')?'Email invalid':"";
 }
 getErrorCode() {
  return this.magasinform.get('code').hasError('required')?'*Champ obligatoire':
  this.magasinform.get('code').hasError('pattern')?'Que des chiffres':
  this.magasinform.get('code').hasError('minlength')?'Minimum 4 chiffres':"";
 }
 getErrorFax() {
   return this.magasinform.get('fax_').hasError('required')?'*Champ obligatoire':
   this.magasinform.get('fax_').hasError('pattern')?'Num fax invalid':
   this.magasinform.get('fax_').hasError('minlength')?'Num fax de 8 chiffres':
   this.magasinform.get('fax_').hasError('maxlength')?'Num fax de 8 chiffres':"";
  }
  getErrorTel() {
   return this.magasinform.get('tele').hasError('required')?'*Champ obligatoire':
   this.magasinform.get('tele').hasError('pattern')?'Num téléphone invalid':
   this.magasinform.get('tele').hasError('minlength')?'Num téléphone de 8 chiffres':
   this.magasinform.get('tele').hasError('maxlength')?'Num téléphone de 8 chiffres':"";
  }

 onSubmit(){
 
   
  if (this.magasinform.invalid) {
    this.onError()
    this.markInvalidControls(this.magasinform);
 
  }
  else if(this.magasinform.valid){
  // for(var i in form1.value) { 
  //   if(form1.value[i] === undefined) {
  //     form1.value[i] = '';
  //   }
  // }
  this.disable=true;
  // var listCaisses= this.resultat;
  // var object={listCaisses};
  // this.mag.updateCaisse(object).subscribe(res=>{
  // },err=>{
  // })
  this.editmagasin.idMagasin=this.id;
  this.editmagasin.libelle=this.magasinform.value.nom_mg;
  this.editmagasin.code_magasin=this.code_mg;
 // this.editmagasin.numeroTelephone=form1.value.tele;
  // this.editmagasin.fax=form1.value.fax_;
  // this.editmagasin.email=form1.value.email_;
  // this.editmagasin.rue=form1.value.rue_;
  // this.editmagasin.idville=form1.value.ville;
  // console.log(this.editmagasin);
  this.mag.updatemagasin(this.editmagasin).subscribe(res=>{
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
 Fermer(){
  this.dialogRef.close();
  }
  reset(){
    this.mag.getmagasinbyId(this.id).subscribe((res:DetailMagasin)=>{
      this.nom_magasin=res.libelle;
      this.code_mg=res.code;
    //   this.rue=res.rue;
    //   this.gouver=res.idGouvernorat;
    //   this.villegouver=res.idVille;
    //   this.mag.getpostalbyid(this.villegouver).subscribe((res:Postal)=>{
    //    this.codepos=res.codePostal;
    //  })
     // this.codepos=res.idCodePostal;
      // this.telephone=res.telephone;
      // this.fax=res.fax;
      // this.email=res.email;
      this.nombrecaisse=res.nombreCaisse;
      this.adresseIP=res.adresseIpRacine;
      // this.mag.getvillebyid(this.gouver).subscribe(res=>{
      //   this.villes=res;
      // })
     })
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
    this.dialogRef.updateSize("950px", "auto");
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
ngAfterViewChecked() {


  if(this.activetab=='service'){

  this.service = new MatTableDataSource(this.result);
  setTimeout(() => {
  this.service.paginator = this.paginator
  this.service.sort = this.sort
})
this.sort.disableClear = true
}
if(this.activetab=='caisse'){
  this.caissedata = new MatTableDataSource(this.listecaisses);
 
  setTimeout(() => {
  this.caissedata.paginator = this.caissPaginator
  
this.caissedata.sort = this.sortcaiss
 
})

this.sortcaiss.disableClear = true
}

}
onRightClick(event: MouseEvent, item) {
  // preventDefault avoids to show the visualization of the right-click menu of the browser
  event.preventDefault();
  this.liste=item



  // we record the mouse position in our object
  this.contextMenuPosition.a = event.clientX + 'px';
  this.contextMenuPosition.b = event.clientY + 'px';

  // we open the menu
  // we pass to the menu the information about our object
  this.contextMenu.menuData = {"item": item}
  this.contextMenu.menu.focusFirstItem('mouse');
  // we open the menu
  this.contextMenu.openMenu();

}
modifier(item){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.width = "500px";
  // dialogConfig.height = "550px";
  dialogConfig.hasBackdrop = false;
  // dialogConfig.maxHeight = "550px"
  dialogConfig.data=this.liste;
const diag=  this.dialog.open(UpdateCaisseComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
} 
serviceModifier(item){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.width = "500px";
  // dialogConfig.height = "550px";
  dialogConfig.hasBackdrop = false;
  // dialogConfig.maxHeight = "550px"
  dialogConfig.data=this.item;
const diag=  this.dialog.open(UpdateServiceComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
} 
Menus(event: MouseEvent, item) {

  this.idetat=item.idEtatWallet
  
  this.item=item
 
  
  event.preventDefault();
  this.srvcontextMenuPosition.c = event.clientX + 'px';
  this.srvcontextMenuPosition.d = event.clientY + 'px';
  this.srvcontextMenu.menuData = { item: item };
  this.srvcontextMenu.menu.focusFirstItem('mouse');
  this.triggers.openMenu();
}
changer(item){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.minWidth="400px"
 
  dialogConfig.hasBackdrop = false;
 
  dialogConfig.data=this.item;
const diag=  this.dialog.open(ActifServiceComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
}
changeaffiche(etat: boolean) {
        if (etat == true) { return this.translate.instant('affiliation.column6'); }
        else   {
          return this.translate.instant('affiliation.column5');
        } 
      }
      detail(item){

 
        const dialogConfig= new MatDialogConfig;
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="700px";
         dialogConfig.hasBackdrop = false;
         let obj={data:this.data,item:item};
        dialogConfig.data=obj;
      const diag=  this.dialog.open( DatailCanalComponent,dialogConfig);
      
        diag.afterClosed().subscribe(item => {
          if(item==1){
            this.ngOnInit();
         }
        })
      }



      detailCaisse(item){

 
        const dialogConfig= new MatDialogConfig;
        dialogConfig.disableClose=true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="700px";
         dialogConfig.hasBackdrop = false;
         let obj={data:this.data,item:item};
        dialogConfig.data=obj;
      const diag=  this.dialog.open( DetailCaisseComponent,dialogConfig);
      
        diag.afterClosed().subscribe(item => {
        //   if(item==1){
        //     this.ngOnInit();
        //  }
        })
      }
}


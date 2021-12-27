import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { Param } from 'app/model/mpga/param';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { ParametreService } from 'app/pages/services/parametre.service';
import { TpeService } from 'app/pages/services/tpe.service';

import { ToastrService } from 'ngx-toastr';


import { DetailEtatComponent } from './detail-etat/detail-etat.component';

import { UpdateEtatComponent } from './update-etat/update-etat.component';
import { UpdateParametreComponent } from './update-parametre/update-parametre.component';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ParametreComponent implements OnInit {
  resultat:any;
  settings:any;
  source:any;
  page_bol:boolean=false;
  scroll_bol:boolean=true;
  loading = false;
  isConnectionAvailableP: boolean = navigator.onLine; 
  mySubscription:any;
  // categorie_manager=[];
  // categorie_magasin=[];
  // categorie_service=[];
  ville:string;
  idville:number;
  code_postal:string;
  idpostal:number;
  RNE:string;
  idrne:number;
  Tel:string;
  idtel:number;
  rue:string;
  idrue:any;
  maxtpe:string;
  debutplageC:string;
  debutplageT:string;
  maxcaisse:string;
  derniercode:string;
  show:boolean=false;
  updateparam=new Param;
  valid:boolean=false;
  list_libelle=[];
  list_Autres=[]
  etatmagasin:any;
  etatcaisse:any;
  etatecart:any;
  etatrecon:any;
  etatmvt:any;
  etatAgent:any;
  etatmaga:any;
  etatcaiss:any;
  categorie:any;
  codeerreur:any;
  contextMenuPosition = { x: '0px', y: '0px' };
  contextModelPosition = { a: '0px', b: '0px' };
  contextAutrePosition = { h: '0px', k: '0px' };
  contextfinancePosition = { p: '0px', q: '0px' };
  contexttpePosition = { z: '0px', x: '0px' };
  id:any
  etatwallet:any
  etatlettrage:any
  etatreconsilliation:any
  etattransaction:any
  utilisateursys:any
  list_financier=[]
  association:any
  etablissement:any
  produits_finance:any
  canal:any
  list_tpe=[]
  marques:any
  models:any
  proprietaires:any
  categories:any
  os:any
  Etattpe:any
 modifparam:boolean=true
  constructor(private service:TpeService,private finance:PaiementService,private router: Router,private param:ParametreService,private dialog:MatDialog,private toast: ToastrService, private changeDetectorRefs: ChangeDetectorRef) { 
    window.addEventListener('online', () => {
      this.isConnectionAvailableP = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          
           this.router.navigated = false;
        }
      }); 
  });

    window.addEventListener('offline', () => {
      this.isConnectionAvailableP = false
     //alert('Problème de connexion');
  });
  }
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contextModel: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contextAutre: MatMenuTrigger;
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('autretrigger') autretrigger: MatMenuTrigger;
  @ViewChild('financiertrigger') financiertrigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contextfinancier: MatMenuTrigger;
  @ViewChild('tpetrigger') tpetrigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contexttpe: MatMenuTrigger;
  ngOnInit(): void {
   
    this.param.etatcloture().subscribe(res=>{
      this.etatrecon=res;
      var obj={name:'Etat réconciliation',value:this.etatrecon,id:1,op:this.modifparam}
      this.list_libelle.push(obj);
     
    })
    this.param.etatecart().subscribe(res=>{
      this.etatecart=res;
      var obj={name:'Etat écart',value:this.etatecart,id:2,op:this.modifparam}
      this.list_libelle.push(obj);
      
    })
    // this.param.etatmouvement().subscribe(res=>{
    //   this.etatmvt=res;
    //   var obj={name:'Etat mouvement',value:this.etatmvt,id:3}
    //   this.list_libelle.push(obj);
    //   console.log(this.list_libelle);
    // })
    // this.param.etatAgent().subscribe(res=>{
    //   this.etatAgent=res;
    //   var obj={name:'Etat agent',value:this.etatAgent,id:4}
    //   this.list_libelle.push(obj);
    //   console.log(this.list_libelle);
    // })
    this.param.etatmagasin().subscribe(res=>{
      this.etatmaga=res;
      var obj={name:'Etat magasin',value:this.etatmaga,id:5,op:this.modifparam}
      this.list_libelle.push(obj);
    
    })
    this.param.etatcaisse().subscribe(res=>{
      this.etatcaiss=res;
      var obj={name:'Etat caisse',value:this.etatcaiss,id:6,op:this.modifparam}
      this.list_libelle.push(obj);
  
    })
    // this.param.categorieAgent().subscribe(res=>{
    //   this.categorie=res;
    //   var obj={name:'Catégorie agent',value:this.categorie,id:7}
    //    this. list_Autres.push(obj);
    //   console.log(this.list_Autres);
    // })
    this.param.codeerreur().subscribe(res=>{
      this.codeerreur=res;
      var obj={name:'Code erreur',value:this.codeerreur,id:8,op:this.modifparam}
      // this.list_libelle.push(obj);
      // console.log(this.list_libelle);
      this.list_Autres.push(obj);
     
    })
    this.param.EtatWallet().subscribe(res=>{
      this.etatwallet=res;
      var obj={name:'Etat produit financier',value:this.etatwallet,id:9,op:this.modifparam}
      this.list_libelle.push(obj);
     
    })
    this.param. EtatLettrage().subscribe(res=>{
      this.etatlettrage=res;
      var obj={name:'Etat lettrage transaction',value:this.etatlettrage,id:10,op:this.modifparam}
      this.list_libelle.push(obj);
      
    })
    this.param.EtatReconcilliation().subscribe(res=>{
      this.etatreconsilliation=res;
      var obj={name:'Etat réconciliation transaction',value:this.etatreconsilliation,id:11,op:this.modifparam}
      this.list_libelle.push(obj);
      
    })
    this.param.EtatTransaction().subscribe(res=>{
      this.etattransaction=res;
      var obj={name:'Etat transaction',value:this.etattransaction,id:12,op:this.modifparam}
      this.list_libelle.push(obj);
      
    })
    this.param.UtilisateurSysteme().subscribe(res=>{
      this.utilisateursys=res;
      var obj={name:'Utilisateur systeme',value:this.utilisateursys,id:13,op:this.modifparam}
      // this.list_libelle.push(obj);
      // console.log(this.list_libelle);
      this.list_Autres.push(obj);
      
    })

    this.finance.ListCategoriesEtablissement().subscribe(res=>{
      this.etablissement=res;
      var obj={name:'Catégorie Etablissement Financier',value:this.etablissement,id:14,op:this.modifparam}
      this.list_financier.push(obj);
 
    })

    this.finance.ListCategoriesProduits().subscribe(res=>{
      this.produits_finance=res;
      var obj={name:'Catégorie Produit Financier',value:this.produits_finance,id:15,op:this.modifparam}
      this.list_financier.push(obj);
 
    })
    this.finance.CanalPaiement().subscribe(res=>{
      this.canal=res;
      var obj={name:'Canal Paiement',value:this.canal,id:16,op:this.modifparam}
      this.list_financier.push(obj);
 
    })
    // this.finance.AssociationProduit_canal().subscribe(res=>{
    //   this.association=res;
    //   var obj={name:'Association Produit-Canal',value:this.association,id:17,op:this.modifparam}
    //   this.list_financier.push(obj);
 
    // })

    this.loading=true
    this.service.getMarque().subscribe(res=>{
      this.marques=res
      this.loading=false
      var obj={name:'Marque TPE',value:this.marques,id:18,op:this.modifparam}
      this.list_tpe.push(obj);
      // console.log(this.list_tpe);
    })
    this.loading=true
    this.service.getModel().subscribe(res=>{
      this.models=res
      this.loading=false
      var obj={name:'Modèle TPE',value:this.models,id:19,op:this.modifparam}
      this.list_tpe.push(obj);
      // console.log(this.list_tpe);
    })
    this.loading=true
this.service. getProprietaire().subscribe(res=>{
  this.proprietaires=res
  this.loading=false
  var obj={name:'Propriétaire',value:this.proprietaires,id:20,op:this.modifparam}
  this.list_tpe.push(obj);
  // console.log(this.list_tpe);
})
this.loading=true
this.service.ListOs().subscribe(res=>{
  this.os=res
  this.loading=false
  var obj={name:'OS TPE',value:this.os,id:22,op:this.modifparam}
  this.list_tpe.push(obj);
  // console.log(this.list_tpe);
})
this.loading=true
this.service.ListCategorie().subscribe(res=>{
  this.categories=res
  this.loading=false
  var obj={name:'Catégorie TPE',value:this.categories,id:21,op:this.modifparam}
  this.list_tpe.push(obj);
  // console.log(this.list_tpe);
})
this.loading=true
this.service.ListEtatTpe().subscribe(res=>{
  this.Etattpe=res
  this.loading=false
  var obj={name:'Etat TPE',value:this.Etattpe,id:23,op:this.modifparam}
  this.list_libelle.push(obj);
  // console.log(this.list_tpe);
})

    this.loading = true;
    this.param.getparametreglobaux().subscribe(res=>{
      this.resultat=res;
      this.loading = false;
      console.log(this.resultat);
      for(var i=0; i<this.resultat.length; i++){
        //manager
        if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_ville'){
          this.ville= this.resultat[i].valeurDefaut;
          this.idville=this.resultat[i].idParametre;
        }
        if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_codepostal'){
          this.code_postal= this.resultat[i].valeurDefaut;
          this.idpostal=this.resultat[i].idParametre;
        }
        if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='RNE_aziza'){
          this.RNE= this.resultat[i].valeurDefaut;
          this.idrne=this.resultat[i].idParametre;
        }
        if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Tel_aziza'){
          this.Tel= this.resultat[i].valeurDefaut;
          this.idtel=this.resultat[i].idParametre;;
        }
        if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_rue'){
          this.rue= this.resultat[i].valeurDefaut;
          this.idrue=this.resultat[i].idParametre;
        }
        //magasin
        if(this.resultat[i].categorie=='Magasin' && this.resultat[i].code=='Mag_Max_TPE'){
          this.maxtpe= this.resultat[i].valeurDefaut;
        }
        if(this.resultat[i].categorie=='Magasin' && this.resultat[i].code=='Mag_Deb_IP_Caisse'){
          this.debutplageC= this.resultat[i].valeurDefaut;
        }
        if(this.resultat[i].categorie=='Magasin' && this.resultat[i].code=='Mag_Deb_IP_TPE'){
          this.debutplageT= this.resultat[i].valeurDefaut;
        }
        if(this.resultat[i].categorie=='Magasin' && this.resultat[i].code=='Mag_Max_Caisse'){
          this.maxcaisse= this.resultat[i].valeurDefaut;
        }
        if(this.resultat[i].categorie=='Magasin' && this.resultat[i].code=='Mag_Num_Der'){
          this.derniercode= this.resultat[i].valeurDefaut;
        }
      }
    //  console.log(this.rue,this.ville,this.code_postal,this.Tel,this.RNE);
    },err=>{
      this.loading=false;
     // console.log(err);
      })   
    // this.settings = {
     
    //   columns: {
    //     categorie: {
    //       title: 'Categorie',
    //     type: 'custom',
    //     renderComponent: CustomRenderParam,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }              
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
    //     code: {
    //       title: 'Code',
    //     type: 'custom',
    //     renderComponent: CustomRenderParam,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }            
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }

    //     },
    //     typologie: {
    //       title: 'Type',
    //     type: 'custom',
    //     renderComponent: CustomRenderParam,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }            
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }

    //     },
       
    //     valeurDefaut: {
    //       title: 'Valeur Defaut',
    //     type: 'custom',
    //     renderComponent: CustomRenderParam,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }              
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
    //     description: {
    //       title: 'Description',
    //     type: 'custom',
    //     renderComponent: CustomRenderParam,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }              
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
       
    //   },
    //   hideSubHeader: true,
    //   attr: {
    //     class: 'table',
    //   },
    //   noDataMessage: '',
    //   actions: {
    //     add: false,
    //     edit: false,
    //     delete: false,
    //   },
  
    //   pager: {  
    //     display: true,  
    //     perPage: 10,
    //   }, 
    // }
  }
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
   // this.contextMenu.menuData = {"j":j};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    document.addEventListener('contextmenu', event => event.preventDefault());
    // this.trigger.openMenu();
  }
  Menumodel(event: MouseEvent,liste,i) {
    event.preventDefault();
    console.log(liste)
  this.id=liste
  console.log(this.id)
    this.contextModelPosition.a = event.clientX + 'px';
    this.contextModelPosition.b = event.clientY + 'px';
    this.contextModel.menuData = {"liste":liste,"i":i};
    this.contextModel.menu.focusFirstItem('mouse');
    // this.contextModel.openMenu();
    this.trigger.openMenu();
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
  MenuAutre(event: MouseEvent,autre,m) {
    event.preventDefault();
    console.log(autre)
    this.id=autre
    this.contextAutrePosition.h = event.clientX + 'px';
    this.contextAutrePosition.k = event.clientY + 'px';
    this.contextAutre.menuData = {"autre":autre,"m":m};
     this.contextAutre.menu.focusFirstItem('mouse');
    // this.contextAutre.openMenu();
    this.autretrigger.openMenu();
    document.addEventListener('contextmenu', event => event.preventDefault());
}
  push(v){
    this.list_libelle.push(v);
    this.list_Autres.push(v)
    console.log(this.list_Autres)
    console.log(this.list_libelle);
  }
  scroll(){
     let newsettings= this.settings;
     newsettings.pager.display=false;
     this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.resultat);
     this.scroll_bol=false;
     this.page_bol=true;
    }
    page(){
     let newsettings= this.settings;
     newsettings.pager.display=true;
     this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.resultat);
     this.scroll_bol=true;
     this.page_bol=false;
    }
    modifier(){
      this.show=true;
    }
    Fermer(){
      this.show=false;
      console.log(this.show)
      this.valid=false;
      // this.param.getparametreglobaux().subscribe(res=>{
      //   this.resultat=res;
      //   for(var i=0; i<this.resultat.length; i++){
      //     //manager
      //     if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_ville'){
      //       this.ville= this.resultat[i].valeurDefaut;
      //     }
      //     if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_codepostal'){
      //       this.code_postal= this.resultat[i].valeurDefaut;
      //     }
      //     if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='RNE_aziza'){
      //       this.RNE= this.resultat[i].valeurDefaut;
      //     }
      //     if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Tel_aziza'){
      //       this.Tel= this.resultat[i].valeurDefaut;
      //     }
      //     if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_rue'){
      //       this.rue= this.resultat[i].valeurDefaut;
      //     }
      //   }
      //   }) 
    }
    reset(){
      this.param.getparametreglobaux().subscribe(res=>{
        this.resultat=res;
        for(var i=0; i<this.resultat.length; i++){
          //manager
          if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_ville'){
            this.ville= this.resultat[i].valeurDefaut;
          }
          if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_codepostal'){
            this.code_postal= this.resultat[i].valeurDefaut;
          }
          if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='RNE_aziza'){
            this.RNE= this.resultat[i].valeurDefaut;
          }
          if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Tel_aziza'){
            this.Tel= this.resultat[i].valeurDefaut;
          }
          if(this.resultat[i].categorie=='Manager' && this.resultat[i].code=='Adresse_aziza_rue'){
            this.rue= this.resultat[i].valeurDefaut;
          }
        }
        }) 
        
    }
    keyPress(){
      this.valid=true;
    }
    profile(liste,i){
      
  console.log(liste.id)
      
      const dialogConfig= new MatDialogConfig;
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      if(liste.id!=19){
      dialogConfig.width="600px";
      dialogConfig.height="auto";
      dialogConfig.maxHeight="95vh";
      dialogConfig.hasBackdrop = false;
       dialogConfig.data=liste;
       
      }
      else{
          dialogConfig.width="auto"
      dialogConfig.maxWidth="105vh"
      dialogConfig.height="auto";
      dialogConfig.maxHeight="95vh";
      dialogConfig.hasBackdrop = false;
       dialogConfig.data=liste;
      }
       const diag=  this.dialog.open(UpdateEtatComponent,dialogConfig)
       liste.op=false
      diag.afterClosed().subscribe((item)=>{
      this.changeDetectorRefs.detectChanges();
      liste.op=true

      console.log(liste.op)
        if(item==1){
          this.list_libelle=[]
          this.list_Autres=[]
          this.list_financier=[]
          this.list_tpe=[]
        this.ngOnInit()
        }
      })
   
   
    }
    // viewprofile(liste,i){
      
    
    //   const dialogConfig= new MatDialogConfig;
    //   dialogConfig.disableClose=true;
    //   dialogConfig.autoFocus=true;
    //   dialogConfig.width="600px";
    //   dialogConfig.height="auto";
    //   dialogConfig.maxHeight="95vh";
    
    //    dialogConfig.data=this.id;
    //  console.log(this.id)
    //   this.dialog.open(DetailEtatComponent,dialogConfig);
   
   
    // }
    updateprofile(liste){
      console.log(this.contextModel.menuData)
      const dialogConfig= new MatDialogConfig;
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="600px";
      dialogConfig.height="auto";
      dialogConfig.maxHeight="95vh";
      dialogConfig.data=this.id;
      
      this.dialog.open(UpdateEtatComponent,dialogConfig).afterClosed().subscribe((item)=>{
        this.changeDetectorRefs.detectChanges();
       
        if(item==1){
          this.list_libelle=[]
          this.list_Autres=[]
          this.list_financier=[]
          this.list_tpe=[]
          this.ngOnInit()
          }
        
      })
        
     
  
    
    
    }
    

    
    onSubmit(){
      this.updateparam.listParametres=[];
      var obj3={idParametre:this.idrue,valeurDefaut:this.rue}
      this.updateparam.listParametres.push(obj3);
      var obj1={idParametre:this.idville,valeurDefaut:this.ville}
      this.updateparam.listParametres.push(obj1);
      var obj2={idParametre:this.idpostal,valeurDefaut:this.code_postal}
      this.updateparam.listParametres.push(obj2);
      var obj5={idParametre:this.idtel,valeurDefaut:this.Tel}
      this.updateparam.listParametres.push(obj5);
      var obj4={idParametre:this.idrne,valeurDefaut:this.RNE}
      this.updateparam.listParametres.push(obj4);
      console.log(this.updateparam);
      const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="400px";
    dialogConfig.height="auto";

  const diag=  this.dialog.open(UpdateParametreComponent,dialogConfig);
  
    diag.afterClosed().subscribe(item => {
     // console.log(item);
       if(item==1){
        this.param.updateparametre(this.updateparam).subscribe(res=>{
          this.toast.success("Paramètres globaux modifié avec succes !","", {timeOut: 2500});
          this.show=false;
          this.ngOnInit();
        },err=>{
          this.toast.error("La modification a échoué !","", {timeOut: 2500});
         // console.log(err);
          }) 
      }
    })
    }

    Menufinancier(event: MouseEvent,finance,m) {

      event.preventDefault();
      this.contextfinancePosition.p = event.clientX + 'px';
      this.contextfinancePosition.q = event.clientY + 'px';
      this.contextfinancier.menuData = {"finance":finance,"m":m};
      this.contextfinancier.menu.focusFirstItem('mouse');
     
      // document.addEventListener('contextmenu', event => event.preventDefault());
      this.financiertrigger.openMenu();
    }
    Menutpe(event: MouseEvent,tpe,m) {

      event.preventDefault();
      this.contexttpePosition.z = event.clientX + 'px';
      this.contexttpePosition.x = event.clientY + 'px';
      this.contexttpe.menuData = {"tpe":tpe,"m":m};
      this.contexttpe.menu.focusFirstItem('mouse');
     
      // document.addEventListener('contextmenu', event => event.preventDefault());
      this.tpetrigger.openMenu();
    }
}
